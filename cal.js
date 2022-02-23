class Calculator{
    constructor(history, current){
        this.history= history;
        this.current= current;
        this.clear();
    }
    clear(){
        this.prevOutput="";
        this.newOutput="";
        this.operation=undefined;
    }
    delete(){
        this.newOutput= this.newOutput.toString().slice(0, -1);
    }
    handleNumber(num){
        if(num == "." && this.newOutput.includes(".")) return;
        this.newOutput= this.newOutput.toString() + num.toString();
    }
    handleOperator(operand){
        if(this.newOutput == "") return;
        if(this.operation !== null){
            this.calculate();
        }
        this.operation= operand;
        this.prevOutput=this.newOutput;
        this.newOutput="";
    }
    percent(){
        return this.newOutput=this.newOutput / 100;
    }
    calculate(){
        let total;
        let prev=parseFloat(this.prevOutput);
        let cur=parseFloat(this.newOutput);
        if(isNaN(prev) || isNaN(cur)) return;
        switch(this.operation){
            case "+":
                total= prev + cur;
                break;
            case "−":
                total= prev - cur;
                break;
            case "×":
                total= prev * cur;
                break;
            case "÷":
                total=prev / cur;
                break;
            default:
                return;
        }
        this.newOutput= total;
        this.operation=undefined;
        this.prevOutput="";
    }
    displayNumber(number){
        let strNum=number.toString();
        let digit=parseFloat(strNum.split(".")[0]);
        let decimal=strNum.split(".")[1];

        let show;
        if(isNaN(digit)){
            show="";
        }
        else{
            show= digit.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }
        if(decimal != ""){
            return `${show}.${decimal}`
        }
        else{
            return show;
        }
    }
    display(){
        this.current.innerHTML= this.newOutput;
        this.history.innerHTML=this.prevOutput;
        if(this.operation != null){
            this.history.innerHTML=
            `${this.prevOutput} ${this.operation}`;
        }
    }
}




const numbers=document.querySelectorAll("[data-number]");
const operator=document.querySelectorAll("[data-operator");
const history=document.querySelector("[data-history]");
const current=document.querySelector("[data-output]");
const clear=document.querySelector("[data-clear]");
const del=document.querySelector("[data-delete]");
const result=document.querySelector("[data-equal]");
const sign=document.querySelector("[data-sign]");

const calculator=new Calculator(history, current);

numbers.forEach(links =>{
    links.addEventListener("click", ()=>{
        calculator.handleNumber(links.innerHTML);
        calculator.display();
    });
});

operator.forEach(link =>{
    link.addEventListener("click", ()=>{
        calculator.handleOperator(link.innerHTML);
        calculator.display();
    });
});

clear.addEventListener("click", ()=>{
    calculator.clear();
    calculator.display();
});

del.addEventListener("click", ()=>{
    calculator.delete();
    calculator.display();
});

result.addEventListener("click", ev=>{
    calculator.calculate();
    calculator.display();
});

sign.addEventListener("click", ()=>{
    calculator.percent();
    calculator.display();
})

