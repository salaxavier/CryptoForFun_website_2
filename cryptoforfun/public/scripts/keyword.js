function encode()
{
  var plain_text = document.getElementById("message").value.toLowerCase();
  var key = document.getElementById("key").value.toLowerCase();
  var cypher_text = [];
  var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
'q','r','s','t','u','v','w','x','y','z'];
  var alphabet2=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
'q','r','s','t','u','v','w','x','y','z'];
  var keyword = [];

  for (var idx=0; idx<key.length; idx++)      //for each keyword character
  {
    keychar = alphabet.indexOf(key[idx]);
    if(keychar == -1)                      //if not in alphabet
    {
      keyword.push(key[idx]);             //pass it to scrambled alphabet
    }
    else
    {
      var val = alphabet2.indexOf(key[idx]);      //if the char is not found within the alphabet2
      if (val !== -1) keyword.push(key[idx]);     //pass char to the begining of scrambled alphabet (after previous ones)
      if (val !== -1) alphabet2.splice(val, 1);  //delete char from alphabet2
    }
  }
  var scrambled = keyword.concat(alphabet2);    //Scrambled alphabet = keyword+alphabet2

  for (var idx=0; idx<plain_text.length; idx++)    //for each message char
  {
    input = alphabet.indexOf(plain_text[idx]);    //index of message char in alphabet
    if(input == -1)
    {
      cypher_text.push(plain_text[idx]);        //if not in alphabet, pass it to the cipher
    }
    else
    {
      var letter = scrambled[input];        //index of char in scrambled alphabet
      cypher_text.push(letter);
    }
  }
  document.getElementById("output").innerHTML = cypher_text.join("");
  document.getElementById("output_name").innerHTML = "Encoded message";
}

function decode()
{
  var plain_text = document.getElementById("message").value.toLowerCase();
  var key = document.getElementById("key").value.toLowerCase();
  var cypher_text = [];
  var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
'q','r','s','t','u','v','w','x','y','z'];
  var alphabet2=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
'q','r','s','t','u','v','w','x','y','z'];
  var keyword = [];

  for (var idx=0; idx<key.length; idx++)      //for each keyword character
  {
    keychar = alphabet.indexOf(key[idx]);
    if(keychar == -1)                      //if not in alphabet
    {
      keyword.push(key[idx]);             //pass it to scrambled alphabet
    }
    else
    {
      var val = alphabet2.indexOf(key[idx]);      //if the char is not found within the alphabet2
      if (val !== -1) keyword.push(key[idx]);     //pass char to the begining of scrambled alphabet (after previous ones)
      if (val !== -1) alphabet2.splice(val, 1);  //delete char from alphabet2
    }
  }
  var scrambled = keyword.concat(alphabet2);    //Scrambled alphabet = keyword+alphabet2

  for (var idx=0; idx<plain_text.length; idx++)    //for each message char
  {
    input = scrambled.indexOf(plain_text[idx]);    //index of ciphered message char in scrambled alphabet
    if(input == -1)
    {
      cypher_text.push(plain_text[idx]);        //if not in alphabet, pass it to the cipher
    }
    else
    {
      var letter = alphabet[input];        ////index of ciphered char in standard alphabet
      cypher_text.push(letter);
    }
  }
  document.getElementById("output").innerHTML = cypher_text.join("");
  document.getElementById("output_name").innerHTML = "Decoded message";
}
