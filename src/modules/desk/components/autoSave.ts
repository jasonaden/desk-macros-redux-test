export class autoSaveFormProvider implements ng.IServiceProvider{
  private debounce = 500;
  private autoSaveMode = true;

  public setDebounce (value) {
    this.debounce = value;
  }
  
  public setAutoSaveMode (value) {
    this.autoSaveMode = value;
  }
  
  public $get () {
    return {
      debounce: this.debounce,
      autoSaveMode: this.autoSaveMode
    };
  }
}

export class autoSaveForm implements ng.IDirective {

  constructor (private autoSaveFormDefaults) {}

  public link = (scope, element, attributes) => {
    let formModel = scope.$eval(attributes.name);
    let saveFormCallback = scope.$eval(attributes.autoSaveForm);
    let saveFormAuto = scope.$eval(attributes.autoSaveFormMode);
    let saveFormDebounce = scope.$eval(attributes.autoSaveFormDebounce);

    if (angular.isUndefined(saveFormAuto)) {
      saveFormAuto = this.autoSaveFormDefaults.autoSaveMode;
    }

    if (saveFormAuto) {
      if (angular.isUndefined(saveFormDebounce)) {
        saveFormDebounce = this.autoSaveFormDefaults.debounce;
      }
      let debounce = _.debounce(getChangedControls, saveFormDebounce);
      scope.$watch(function () {
        return formModel.$dirty && formModel.$valid;
      }, function (newValue) {
        if (newValue) {
          debounce();
          formModel.$valid = false;
        }
      });
    } else {
      element.on('submit', function (event) {
        event.preventDefault();
        getChangedControls(event);
      });
    }

    function getChangedControls(event) {
      if (formModel.$invalid || formModel.$pristine) {
        return;
      }
      let controls = {};
      //only way to get form controls if angular doesn't implement $getControls on form object
      angular.forEach(formModel, checkForm);

      formModel.$setPristine();

      let promise = saveFormCallback(controls, event);

      function checkForm(value, key) {
        if (key[0] !== '$' && key[0] !== '.' && value.$dirty) {
          let keys = key.split(/\./);
          if (scope.autoSaveFormProperties && scope.autoSaveFormProperties[keys[0]]) {
            keys = scope.autoSaveFormProperties[keys[0]].split(/\./);
          }
          constructControlsObject(keys, value.$modelValue, controls);
        }
      }

      function constructControlsObject(keys, value, controls) {
        let key = keys.shift();

        if (keys.length) {
          if (!controls.hasOwnProperty(key)) {
            controls[key] = {};
          }
          constructControlsObject(keys, value, controls[key]);
        } else {
          controls[key] = value;
        }
      }
    }
  }

  static factory(): ng.IDirectiveFactory {
    const directive = (autoSaveFormDefaults) => new autoSaveForm(autoSaveFormDefaults);
    directive.$inject = ['autoSaveFormDefaults'];
    return directive;
  }
}

export class autoSaveFormProperty implements angular.IDirective{
  
  public link = (scope, element, attributes) => {
    if (attributes.autoSaveFormProperty) {
      if (angular.isUndefined(scope.autoSaveFormProperties)) {
        scope.autoSaveFormProperties = {};
      }
      let keys = attributes.autoSaveFormProperty.split(/\./);
      scope.autoSaveFormProperties[keys.splice(0, 1)] = keys.join('.');
    }
  }
  
  static factory(): ng.IDirectiveFactory {
    return () => new autoSaveFormProperty();
  }

}

