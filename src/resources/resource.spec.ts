
import {Resource} from './resource';

describe("Resource Class", () => {
  
  it('should have isLoading method default to false', () => {
    expect(Resource.isLoading()).toBe(false);
  });
  
  
  it('should have isLoading(id) method default to false', () => {
    expect(Resource.isLoading(1)).toBe(false);
  });
  
  it('should be defined', () => {
    expect(true).toBe(true);
  })
});
