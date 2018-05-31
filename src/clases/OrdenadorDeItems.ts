import { Item } from "./Item";

export class OrdenadorDeItems{
    public DESC: -1;
    public ASC: 1;
    public items:Item[];
    public orden:1;

    public constructor(orden){
        this.items.push(new Item("null","null","null"));
        this.orden=orden;
    }
    public push(item:Item){
        this.items.push(item);
        var i=this.items.length;
        var p=0;
        var tem;
        var padre;
        var hijo;
        while(i>1){
            p=Math.trunc(i/2);
            padre=this.items[p];
            hijo=this.items[i];
            if(this.comparar(padre,hijo)){
                tem=padre;
                padre=hijo;
                hijo=tem;
            }
            i=p;
        }
    }

    public pop(){
        var item;
        var largo=this.items.length-2;
        if(largo>0){
            var hijo;
            var hijo1;
            var hijo2;
            var p=1;
            var i=p*2;
            item=this.items[1];
            this.items[1]=this.items[largo+1];
            this.items.pop();
            while(p<largo){
                hijo1=this.items[i];
                hijo2=this.items[i+1];
                if(this.comparar(hijo1,hijo2)){
                    hijo=hijo2;
                }else{
                    hijo=hijo1;
                }
              
            }
        }
        return item;
    }
    comparar(nodo1:Item,nodo2:Item){
        var i=0;
        if(nodo1.valor>nodo2.valor){
            i=-1;
        }else if(nodo1.valor<nodo2.valor){
            i=1;
        }else{
            if(nodo1.valor2>nodo2.valor2){
                i=-1;
            }
        }
        return i==this.orden;
    }
}