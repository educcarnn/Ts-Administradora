export function formatarData(data) {
  if (!data) {
    return ""; // ou algum valor padrão ou até mesmo lançar um erro
  }
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function formatarCNPJ(cnpj) {
  return cnpj
    .replace(/\D/g, '') 
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .substr(0, 18);
}

export function formatarTelefone(numero) {
  numero = numero.replace(/\D/g, ''); // remove qualquer caracter que não seja número

  if (numero.length <= 8) {
    // Formato de telefone fixo (sem DDD)
    return numero.replace(/(\d{4})(\d)/, '$1-$2');
  } else if (numero.length === 9) {
    // Formato de celular com 9º dígito (sem DDD)
    return numero.replace(/(\d{5})(\d)/, '$1-$2');
  } else if (numero.length === 10) {
    // Formato de telefone fixo (com DDD)
    return `${numero.substr(0, 2)} ${numero.substr(2).replace(/(\d{4})(\d)/, '$1-$2')}`;
  } else if (numero.length === 11) {
    // Formato de celular com 9º dígito (com DDD)
    return `${numero.substr(0, 2)} ${numero.substr(2).replace(/(\d{5})(\d)/, '$1-$2')}`;
  }

  return numero; 
}
