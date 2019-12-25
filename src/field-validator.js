import validateEmail from "email-validator";
import validateDomain from "is-valid-domain";

class FieldValidator {
  static validateEmailValueSyntax = addr => {
    return validateEmail.validate(addr) ? 1 : 0;
  };

  static validateDomainValueSyntax = addr => {
    return validateDomain(addr) ? 1 : 0;
  };

  static validateUniqueDomainPerEmail = (email = "", domain) => {
    return fetch(
      `https://coverage-api.herokuapp.com/checkEmailDomain?email=${email}&domain=${domain}`
    )
      .then(res => res.json())
      .then(data => {
        if (data === "found") return true;
        else return false;
      })
      .catch(err => console.log(err));
  };

  static runEmailValidators = email => {
    if (email === "") return "Email must be provided";
    if (!this.validateEmailValueSyntax(email))
      return "Email syntax is incorrect, please check again";
    return "";
  };

  static runDomainValidators = domain => {
    if (domain === "") return "Domain must be provided";
    if (!this.validateDomainValueSyntax(domain))
      return "Domain syntax is incorrect, please check again";
    return "";
  };
}

export default FieldValidator;
