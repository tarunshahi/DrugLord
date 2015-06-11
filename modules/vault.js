'use strict'
 drugLord.service('vaultService',['warehouseService','cityService',function(whs,cityServ){

 	var scope=this;
 	scope.vault=[];

scope.pushInvault=function() {

  for(var i=0;i< whs.whdrugs.length;i++)  {

    
    if(whs.whdrugs[i].selected==true) {

      var temp=parseInt(window.prompt("You want to put "+whs.whdrugs[i].name+" into vault.\n You have avilable quantity is "+whs.whdrugs[i].qty+"\n Enter the quantity you want to put inside vault"));
      if((temp <= whs.whdrugs[i].qty) && (temp > 0) && (!isNaN(temp)))
      {
          var counter=0;
          for(var j=0, n=scope.vault.length; j < n; j++ ) {
             
              if(cityServ.currCity.name == scope.vault[j].cityName) {
                  
                    break;
                }
                counter++;
            }
            if(counter == scope.vault.length) {
             //  previously city is not present in vault 
                      if(temp < whs.whdrugs[i].qty && temp > 0) {

                          scope.vault.push({ cityName:cityServ.currCity.name,vaultInfo:[{name:whs.whdrugs[i].name,price:whs.whdrugs[i].price,qty:temp,selected:false}]});
                          whs.whdrugs[i].qty-=temp;
                      }
                      else if(temp == whs.whdrugs[i].qty) {
                          
                          scope.vault.push({ cityName:cityServ.currCity.name,vaultInfo:[{name:whs.whdrugs[i].name,price:whs.whdrugs[i].price,qty:temp,selected:false}]});
                          whs.whdrugs.splice(i,1);          
                      }
                      else{

                           window.alert(" Enter value in specifed range ");
                      }

             }
             else
              {

                    var counter2=check(i,scope.vault[counter].vaultInfo,whs.whdrugs) ;
                    if(counter2 == scope.vault[counter].vaultInfo.length )
                    {

                      if(temp < whs.whdrugs[i].qty && temp > 0) {

                         scope.vault[counter].vaultInfo.push({name:whs.whdrugs[i].name,price:whs.whdrugs[i].price,qty:temp,selected:false});
                          whs.whdrugs[i].qty-=temp;
                      }
                      else if(temp == whs.whdrugs[i].qty) {
                          
                           scope.vault[counter].vaultInfo.push({name:whs.whdrugs[i].name,price:whs.whdrugs[i].price,qty:temp,selected:false});
                           whs.whdrugs.splice(i,1);          
                      }
                    }
                   else 
                   {
                           if(temp < whs.whdrugs[i].qty) 
                            {
                               scope.vault[counter].vaultInfo[counter2].qty+=temp;
                               whs.whdrugs[i].qty-=temp;
                              
                            }
                           else if(temp == whs.whdrugs[i].qty)
                           {
                              
                              scope.vault[counter].vaultInfo[counter2].qty+=temp;
                              whs.whdrugs.splice(i,1); 
                                       
                            }
                    }
              }
           }  

          else  
          {

              window.alert(" Enter value in specifed range ");
          }
    }
  }
};

     function check(i,obj1,obj2)
    {
      var flag=0;
      for( var j=0;j<obj1.length;j++)
      {
           console.log("inside check");
        if( obj1[j].name == obj2[i].name )
        {
          break;
        }
        flag++;
      }
      return flag;
    }

scope.selectVaultItems=function(e,index){
     var selectCurrVault=scope.getvaultInfo1();
    for(var i=0; i < selectCurrVault.vaultInfo.length; i++) {
            selectCurrVault.vaultInfo[i].selected = false;
        }
       selectCurrVault.vaultInfo[index].selected = true;
        if(scope.prevTarget == null) {
            e.currentTarget.className="list-group-item active";
            scope.prevTarget = e.currentTarget;
        } else if(scope.prevTarget == e.currentTarget) {
            if(e.currentTarget.className == "list-group-item active") {
                 e.currentTarget.className = "list-group-item";
               selectCurrVault.vaultInfo[index].selected = false;
            } else {
                 e.currentTarget.className = "list-group-item active";
                selectCurrVault.vaultInfo[index].selected = true;
            }
        }
        else {
            scope.prevTarget.className="list-group-item";
            e.currentTarget.className="list-group-item active";
            scope.prevTarget = e.currentTarget;
        }
};
scope.pushInPocket=function()
{
  var currCityVault=scope.getvaultInfo1();
   for(var i=0;i< currCityVault.vaultInfo.length;i++)
  {
    if(currCityVault.vaultInfo[i].selected == true)
    {

      var temp=parseInt(window.prompt("You want to push "+currCityVault.vaultInfo[i].name+" into market from vault.\n Enter quantity you want to push "));
      if( (temp <= currCityVault.vaultInfo[i].qty) && (temp >0) && (! isNaN(temp)))
      {
          var flag=check(i,whs.whdrugs,currCityVault);
          if(flag == whs.whdrugs.length)
          { 
            if(temp < currCityVault.vaultInfo[i].qty)
            {
               whs.whdrugs.push({name:currCityVault.vaultInfo[i].name,price:currCityVault.vaultInfo[i].price,qty:temp,selected:false});
               currCityVault.vaultInfo[i].qty-=temp;
            }
            else if(temp == currCityVault.vaultInfo[i].qty)
            {
               whs.whdrugs.push({name:currCityVault.vaultInfo[i].name,price:currCityVault.vaultInfo[i].price,qty:temp,selected:false});
               currCityVault.vaultInfo.splice(i,1);          
            }
          }
          else
          {
             
            if(temp < currCityVault.vaultInfo[i].qty)
            {
               whs.whdrugs[flag].qty+=temp;
               currCityVault.vaultInfo[i].qty-=temp;
            }
            else if(temp == currCityVault.vaultInfo[i].qty)
            {
              whs.whdrugs[flag].qty+=temp;
              currCityVault.vaultInfo.splice(i,1);          
            }
          } 
      }
      else
      {
        window.alert("enter value in specifed range");
      } 
    }
  }
};

//scope.currCityVault = [];
 scope.getvaultInfo1 =function(){
   var currCityVault  =[];
    for(var j=0, n=scope.vault.length; j < n; j++ ) {
             
              if(cityServ.currCity.name == scope.vault[j].cityName) {
                  
                    currCityVault = scope.vault[j];
                    return currCityVault;
                }
            }
 };
scope.getvaultInfo =function(){
    for(var j=0, n=scope.vault.length; j < n; j++ ) {
             
              if(cityServ.currCity.name == scope.vault[j].cityName) {
                  
                    return  scope.vault[j].vaultInfo; 
                }
            }
 };


 }]);