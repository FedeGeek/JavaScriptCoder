const resultados = document.getElementById('resultados');
const cabeceraResultados = document.getElementById('cabeceraResultados');
const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre','Total'];

for(let i=0;i<meses.length;i++){
    let mes = document.createElement('th');
    cabeceraResultados.appendChild(mes);
    mes.appendChild(document.createTextNode(meses[i]));
}
