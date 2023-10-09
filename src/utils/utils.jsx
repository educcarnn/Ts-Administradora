export function formatarData(data) {
  if (!data) {
    return ""; 
  }
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function formatarCNPJ(cnpj) {
  return cnpj
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substr(0, 18);
}

export function formatarTelefone(numero) {
  numero = numero.replace(/\D/g, "");

  if (numero.length <= 8) {
    return numero.replace(/(\d{4})(\d)/, "$1-$2");
  } else if (numero.length === 9) {
    return numero.replace(/(\d{5})(\d)/, "$1-$2");
  } else if (numero.length === 10) {
    return `${numero.substr(0, 2)} ${numero
      .substr(2)
      .replace(/(\d{4})(\d)/, "$1-$2")}`;
  } else if (numero.length === 11) {
    return `${numero.substr(0, 2)} ${numero
      .substr(2)
      .replace(/(\d{5})(\d)/, "$1-$2")}`;
  }

  return numero;
}
