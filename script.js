const knapsack= (plain,m,n,private)=>{
  var public=[];
  var notes = [];
  for(var i=65;i<=90;i++){
      notes.push(String.fromCharCode(i));
  }
  console.log(`Kunci private -> ${private}`);
  console.log(`m = ${m}`);
  console.log(`n = ${n}`);
  private.forEach(p => {
      console.log(`${p}×${n} mod ${m} = ${p*n%m}`);
      public.push(p*n%m);
  });
  console.log(`Kunci publik -> ${public}`);
  console.log("-----------------------------------------");
  var tempPlain=[];
  var plainBiner=[];
  var chiper=[];
  console.log("--------------Proses Enkrip--------------");
  for(var i=0;i<plain.length;i++){
      console.log(`Blok plain ${i+1}`);
      tempPlain.push(notes.indexOf(plain[i]));
      plainBiner.push(decimalToBinary5Digits(tempPlain[i]));
      console.log(`${plain[i]} = ${tempPlain[i]} -> ${plainBiner[i].split('').map(Number)}`);
      console.log(`Publik -> ${public}`);
      var total=0;
      for(var j=0;j<plainBiner[i].length;j++){
          if(plainBiner[i][j]==1){
              total+=public[j];
          }
      }
      chiper.push(total)
      console.log(`        = ${total} mod 26 = ${chiper[i]%26} -> ${notes[chiper[i]%26]}`);
      console.log("-----------------------------------------");
  }
  var nInverse;
  for(var i=1;i<=100000;i++){
      nInverse=(1+m*i)/n
      if(Number.isInteger(nInverse)){
          console.log(`n^-1 = 1 + ${m} × ${i}/${n} = ${nInverse}`);
          break;
      }
  }
  console.log("--------------Proses Dekrip--------------");
  for(var i=0;i<plain.length;i++){
      var dekrip=chiper[i]*nInverse%m;
      var binaryString=subsetSum(private, dekrip).join('');
      console.log(`${chiper[i]}×${nInverse} mod ${m} = ${dekrip} = ${binaryString} -> ${parseInt(binaryString, 2)}-> ${notes[parseInt(binaryString, 2)]}`);
  }
}

// var plain = "SAMSUNG";
// var m = 79;
// var n = 19;
// var private=[3,5,9,19,37];



function subsetSum(array, target) {
    var result = Array(array.length).fill(0);
  
    function isSubsetSum(index, currentSum) {
      if (currentSum === target) {
        return true;
      }
  
      if (index === array.length || currentSum > target) {
        return false;
      }
  
      // Coba termasukkan elemen ke dalam subset
      if (isSubsetSum(index + 1, currentSum + array[index])) {
        result[index] = 1;
        return true;
      }
  
      // Coba tanpa termasukkan elemen ke dalam subset
      return isSubsetSum(index + 1, currentSum);
    }
  
    isSubsetSum(0, 0);
  
    return result;
  }
  

  
function decimalToBinary5Digits(decimalNumber) {
    var binaryString = decimalNumber.toString(2);
    
    // Menambahkan nol di depan jika panjangnya kurang dari 5 digit
    while (binaryString.length < 5) {
      binaryString = '0' + binaryString;
    }
    
    return binaryString;
  }