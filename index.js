
'use strict';

/**
 Descrption: Seo Reader 
 Author: Jean Ouédrogo
 Date:2018/10/04
**/
module.exports=function(directory,strongTagNum){
const fs=require('fs') // file reader package
var successRate=7
    console.log("============SEO analytics start===================")
       /*
            check that filename is entered
        */ 
  if(directory==""){
  	 console.log("pathname cannot be empty")
  	
  }else{

       /*
            check if file is html
        */
  	var extension=directory.split(".")[1]
  	if(extension!="html")
  	{
  		 console.log("input is not a html file , please retry with a html file")
       console.log("success Rate: 0%")
  		process.exit()

  	}
        /*
            read html file 
        */
  	fs.readFile(directory, 'utf8', function (err,data) {
      if (err) {
        console.log(err);
        console.log("success Rate: 0%")
        process.exit()
      }else{
 
        /*
            split the html code in two parts <head> and body
        */


        var head=data.split("</head>")[0].split('<head>')[1]
        var body=data.split("</body>")[0].split('<body')[1]
        /*
            check that file contains code
        */

        if (head==undefined) {
          console.log("The input file has no <head /> tag")
          console.log("success Rate: 0%")
            process.exit()
        }
        if (body==undefined) {

          console.log("The input file has no <body /> tag")
          console.log("success Rate: 0%")
          process.exit()

        }
        /*
            Check number of <title> tag 
            @print if there is no title tags included 
        */

        if (!head.includes('<title>')) {
        	
        	 console.log("============<title/> tag analytics =================== \n This html is without a title tag")
           successRate-=1
        }
        /*
            Check <meta name="description" 
            @print if there is no <meta name="description" in <head> 
        */
        if (!head.includes('name="description"')) {
        	
        	 console.log("============ <meta name='description' analytics =================== \n Missing name='descriptions' attribute in meta")
           successRate-=1
        }
        /*
            Check <meta name="keywords" 
            @print if there is no <meta name="keywords" in <head> 
        */
        if (!head.includes('name="keywords"')) {
        	
        	 console.log("============ <meta name='keywords' analytics =================== \n Missing name='keywords' attribute in meta")
           successRate-=1
        }
        /*
            Check number of <strong> tags 
            @print if number of <strong> tags greater than input
        */
        var strongTempArray=body.split('</strong>')
        var strongCount=parseInt(strongTempArray.length)-1
        if ( strongCount<strongTagNum) {
          console.log("============ <strong/> tag analytics ===================")
        	console.log("There are less strong tags than normal")
        	console.log("The normal number of str tags is :"+strongTagNum)
        	console.log("But your file contains only: "+strongCount)
          successRate-=1

        }
        /*
            Check number of <h1> tags 
            @print if number of h1 tags >1
        */

        var H1TempArray=body.split('</h1>')
        var H1Count=parseInt(H1TempArray.length)-1
        if(H1Count>1)
        {
           
        	console.log("\n ============ <h1/> tag analytics =================== \n There is more than one H1 tag")
          successRate-=1
        }
        /*
            Check <a> rel attribute
            @return the number of <a> tags without rel attribute
        */
        var aTagTempArray=body.split('</a>')
        var relCount=0

        for (var i = 0; i < aTagTempArray.length; i++) {
        	if(aTagTempArray[i].includes('<a'))
        	{
            var aString=aTagTempArray[i].split('<a')[1]
               if(!aString.includes('rel'))
               {
                 relCount+=1

               }
        	}
        }
        if(relCount>0){
        	
        	console.log("============ <a/> tag analytics ===================\n  There are "+relCount+" a tag(s) without rel attribute")
          successRate-=1

        }
        /*
            Check image  alt attribute
            @return the number of images without alt attribute
        */

        var imgTagTempArray=body.split('<')
        var altCount=0
        for (var i = 0; i < imgTagTempArray.length; i++) {
            
           var Imgtag=imgTagTempArray[i].split('>')[0]
             

             if(Imgtag.includes('img')&&!Imgtag.includes('alt'))
             {
               altCount+=1
             }
           
        }
        if (altCount>0) {

          console.log("============ <img/> tag analytics ===================\n  There are "+altCount+" img tag(s) without alt attribute")
          successRate-=1
        }
        /*
          Print the SEO grade 
        */
        successRate=Math.ceil((successRate/7)*100)
        console.log("=================Your SEO Grade====================")
        console.log("Success rate: "+successRate+"%")
      }
      });
  }

}

  
  







