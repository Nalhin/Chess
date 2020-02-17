import { isAnyFormFieldEmpty } from '../isAnyFormFieldEmpty';

describe('isAnyFormFieldEmpty', () => {
  it('should be falsy, if all form fields are filled', () => {
    const form = { login: 'user', email: 'email' };

    const result = isAnyFormFieldEmpty(form);

    expect(result).toBeFalsy();
  });
  it('should be truthy, if form field is empty', () => {
    const form = { login: 'user', email: '' };

    const result = isAnyFormFieldEmpty(form);

    expect(result).toBeTruthy();
  });
});
