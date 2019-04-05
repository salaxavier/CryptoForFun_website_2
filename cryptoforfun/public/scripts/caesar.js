function encode()
{
  var plain_text = document.getElementById("message").value.toLowerCase();
  var cypher_text = [];
  var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
'q','r','s','t','u','v','w','x','y','z'];

  for (var idx=0; idx<plain_text.length; idx++)  //for each character from the message
  {
    input = alphabet.indexOf(plain_text[idx]);
    if(input == -1)         //if the character is not present in the alphabet
    {
      cypher_text.push(plain_text[idx]);    //copy the input character
    }
    else
    {
      var shift = document.getElementById("shift").value;
      var shift_int = parseInt(shift, 10);        //Turn shift value from str into int
      var coded = (input+shift_int)%26;
      var letter = alphabet[coded];
      cypher_text.push(letter);     //add encoded character to the cipher
    }
  }
  document.getElementById("output").innerHTML = cypher_text.join("");
  document.getElementById("output_name").innerHTML = "Encoded message";
}

function decode()
{
  var plain_text = document.getElementById("message").value;
  var cypher_text = [];
  var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
'q','r','s','t','u','v','w','x','y','z'];

  for (var idx=0; idx<plain_text.length; idx++)
  {
    input = alphabet.indexOf(plain_text[idx]);
    if(input == -1)
    {
      cypher_text.push(plain_text[idx]);
    }
    else
    {
      var shift = document.getElementById("shift").value;
      var shift_int = parseInt(shift, 10);    //Convert from str to int
      var coded = (input-shift_int)%26;
      var letter = alphabet[coded];
      cypher_text.push(letter);
      if(coded < 0)
      {
        var coded=(coded + 26);
        var letter = alphabet[coded];
        cypher_text.push(letter);
      }
    }
  }
  document.getElementById("output").innerHTML = cypher_text.join("");
  document.getElementById("output_name").innerHTML = "Decoded message";
}
