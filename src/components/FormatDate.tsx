export default function formatarData(dataString: string | number | Date) {
    const dataObj = new Date(dataString);
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); 
    const dia = dataObj.getDate().toString().padStart(2, '0'); 
    const hora = dataObj.getHours().toString().padStart(2, '0'); 
    const minutos = dataObj.getMinutes().toString().padStart(2, '0');


    return `${dia}/${mes} ${hora}:${minutos}`;
}