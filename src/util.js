export default function format(num){
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}