export function formatCnpj(value: string): string {
  // Remove tudo que não for dígito
  const numericValue = value.replace(/\D/g, '');

  // Aplica a máscara
  let maskedValue = '';
  if (numericValue.length > 0) {
    maskedValue += numericValue.substring(0, 2);
    if (numericValue.length > 2) maskedValue += '.' + numericValue.substring(2, 5);
    if (numericValue.length > 5) maskedValue += '.' + numericValue.substring(5, 8);
    if (numericValue.length > 8) maskedValue += '/' + numericValue.substring(8, 12);
    if (numericValue.length > 12) maskedValue += '-' + numericValue.substring(12, 14);
  }
  return maskedValue;
}

export function isValidCnpj(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return false;

  // Evita CNPJs com todos os dígitos iguais (ex: "00.000.000/0000-00")
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Valida os dígitos verificadores
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}