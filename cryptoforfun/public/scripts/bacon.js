function encode()
{
  var plain_text = document.getElementById("message").value.toLowerCase();
  var cypher_text = [];
  var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
'q','r','s','t','u','v','w','x','y','z'];
  var bacon=['aaaaa','aaaab','aaaba','aaabb','aabaa','aabab','aabba','aabbb','abaaa','abaaa','abaab','ababa','ababb','abbaa','abbab','abbba',
'abbbb','baaaa','baaab','baaba','baabb','baabb','babaa','babab','babba','babbb']

  for (var idx=0; idx<plain_text.length; idx++)
  {
    input = alphabet.indexOf(plain_text[idx]);
    if(input == -1)
    {
      cypher_text.push(plain_text[idx]);
    }
    else
    {
      var coded = (input)%26;
      var letter = bacon[coded];
      cypher_text.push(letter);
    }
  }
  document.getElementById("output").innerHTML = cypher_text.join("").toUpperCase();
  document.getElementById("output_name").innerHTML = "Encoded message";
}


function decode()
{
  var encoded_text = document.getElementById("message").value.toLowerCase();
  var decoded_text = [];
  var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
'q','r','s','t','u','v','w','x','y','z'];
  var bacon=['aaaaa','aaaab','aaaba','aaabb','aabaa','aabab','aabba','aabbb','abaaa','abaaa','abaab','ababa','ababb','abbaa','abbab','abbba',
'abbbb','baaaa','baaab','baaba','baabb','baabb','babaa','babab','babba','babbb']

for (var count=0; count<encoded_text.length;)
  {
    slices = encoded_text.substr(count, 5);
    input = bacon.indexOf(slices);
    if(input == -1)
    {
      decoded_text.push(encoded_text[count]);
      count=count+1
    }
    else
    {
      var letter = alphabet[input];
      decoded_text.push(letter);
      count=count+5
    }
  }
document.getElementById("output").innerHTML = decoded_text.join("");
document.getElementById("output_name").innerHTML = "Decoded message";
}
