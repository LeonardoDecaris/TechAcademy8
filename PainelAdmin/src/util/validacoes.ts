export const validaCNH = (cnh: string): boolean => {
    if (typeof cnh !== 'string') {
        return false;
    }
    const cnhRegex = /^[0-9]{11}$/;
    return cnhRegex.test(cnh);
};


/**
 * Valida o e-mail do usuário.
 * @param email Email do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarEmail(email: string): string | true {
  if (!email) return "E-mail obrigatório";
  const trimmedEmail = email.trim().toLowerCase();
  
  if (trimmedEmail.length < 5) return "E-mail muito curto";
  if (trimmedEmail.length > 100) return "E-mail muito longo";
  
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(trimmedEmail)) return "E-mail inválido";
  
  const [local, domain] = trimmedEmail.split('@');
  
  if (local.length > 64) return "Parte local longa";
  if (local.length < 1) return "Parte local inválida";
  if (local.startsWith('.') || local.endsWith('.')) return "Pontos inválidos na parte local";
  if (local.includes('..')) return "Pontos consecutivos não permitidos";
  
  if (domain.length > 63) return "Domínio longo";
  if (domain.length < 4) return "Domínio curto";
  if (!domain.includes('.')) return "Domínio inválido";
  if (domain.startsWith('-') || domain.endsWith('-')) return "Hífens inválidos no domínio";
  
  const validTLDs = ['com', 'org', 'net', 'edu', 'gov', 'br', 'co', 'info', 'biz'];
  const tld = domain.split('.').pop() || "";
  if (!validTLDs.includes(tld)) return "Domínio de topo não reconhecido";
  
  return true;
}


/**
 * Valida o CPF do usuário.
 * @param cpf CPF do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarCPF(cpf: string): string | true {
  if (!cpf) return "CPF obrigatório";
  
  const cleanedCPF = cpf.replace(/[^\d]/g, '');
  if (cleanedCPF.length !== 11) return "Deve ter exatamente 11 dígitos";
  
  const invalidSequences = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ];
  if (invalidSequences.includes(cleanedCPF)) return "CPF inválido";
  
  if (!/^\d+$/.test(cleanedCPF)) return "CPF deve conter apenas números";
  
  let soma = 0;
  let peso = 10;
  for (let i = 0; i < 9; i++) {
    soma += Number(cleanedCPF[i]) * peso--;
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;
  if (digito1 !== Number(cleanedCPF[9])) return "CPF inválido (primeiro dígito verificador)";
  
  soma = 0;
  peso = 11;
  for (let i = 0; i < 10; i++) {
    soma += Number(cleanedCPF[i]) * peso--;
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;
  if (digito2 !== Number(cleanedCPF[10])) return "CPF inválido (segundo dígito verificador)";
  
  return true;
}

/**
 * Valida o nome completo do usuário.
 * @param nome Nome completo do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarNome(nome: string): string | true {
  if (!nome) return "Nome obrigatório";
  
  const trimmedNome = nome.trim().replace(/\s+/g, ' ');
  
  if (trimmedNome.length < 3) return "Mínimo 3 caracteres";
  if (trimmedNome.length > 50) return "Nome muito longo";

  const nameParts = trimmedNome.split(' ');
  if (nameParts.length < 2) return "Informe nome e sobrenome";
  
  const regex = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)+$/;
  if (!regex.test(trimmedNome)) return "Apenas letras e espaços, com pelo menos dois nomes";
  if (nameParts.some(part => part.length < 2)) return "Cada parte do nome deve ter pelo menos 2 caracteres";
  if (/(.)\1\1/.test(trimmedNome.replace(/\s/g, ''))) return "Não pode ter 3 letras iguais consecutivas";
  
  return true;
}

/**
 * Valida a senha do usuário.
 * @param senha Senha do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarPassword(senha: string): string | true {
  if (!senha) return "Senha obrigatória";
  if (senha.length < 8) return "Mínimo 8 caracteres";
  if (senha.length > 64) return "Senha muito longa";
  
  if (!/[a-z]/.test(senha)) return "Precisa de pelo menos 1 letra minúscula";
  if (!/[A-Z]/.test(senha)) return "Precisa de pelo menos 1 letra maiúscula";
  if (!/[!@#$%^&*()/\[\]]/.test(senha)) return "Precisa de pelo menos 1 caractere especial (incluindo /)";
  if (/(.)\1\1/.test(senha)) return "Não pode ter 3 caracteres iguais consecutivos";
  if (/[\s\\]/.test(senha)) return "Não pode conter espaços ou barra invertida";
  
  const commonPatterns = ['123', 'abc', 'qwe', 'password', 'senha'];
  if (commonPatterns.some(pattern => senha.toLowerCase().includes(pattern))) {
    return "Evite padrões comuns na senha";
  }
  
  return true;
}

/**
 * Valida o CNPJ do usuário.
 * @param cnpj CNPJ do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarCNPJ(cnpj: string): string | true {
  if (!cnpj) return "CNPJ obrigatório";

  const cleanedCNPJ = cnpj.replace(/[^\d]/g, '');
  if (cleanedCNPJ.length !== 14) return "Deve ter exatamente 14 dígitos";

  const invalidSequences = [
    '00000000000000', '11111111111111', '22222222222222', '33333333333333',
    '44444444444444', '55555555555555', '66666666666666', '77777777777777',
    '88888888888888', '99999999999999'
  ];
  if (invalidSequences.includes(cleanedCNPJ)) return "CNPJ inválido";

  if (!/^\d+$/.test(cleanedCNPJ)) return "CNPJ deve conter apenas números";

  let tamanho = cleanedCNPJ.length - 2;
  let numeros = cleanedCNPJ.substring(0, tamanho);
  let digitos = cleanedCNPJ.substring(tamanho);

  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) return "CNPJ inválido (primeiro dígito verificador)";

  tamanho = tamanho + 1;
  numeros = cleanedCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(1))) return "CNPJ inválido (segundo dígito verificador)";

  return true;
}
 
/**
 * Aplica máscara ao CNPJ.
 * @param cnpj CNPJ sem máscara
 * @returns CNPJ formatado
 */
export function mascaraCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/[^\d]/g, '').slice(0, 14);
  return cleaned
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
}