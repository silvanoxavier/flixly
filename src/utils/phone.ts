export function formatPhoneNumber(value: string): string {
  // Remove tudo que não for dígito
  const numericValue = value.replace(/\D/g, '');

  // Aplica a máscara (ex: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
  let maskedValue = '';
  if (numericValue.length > 0) {
    maskedValue += '(' + numericValue.substring(0, 2);
    if (numericValue.length > 2) maskedValue += ') ' + numericValue.substring(2, 7);
    if (numericValue.length > 7) maskedValue += '-' + numericValue.substring(7, 11);
  }
  return maskedValue;
}