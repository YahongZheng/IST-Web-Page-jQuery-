/*Yahong Zheng*/
/*ISTE340*/
/*Project 2*/

$(function(){
	$("#accordion").accordion({
		collapsible: true,  // to allow all sections to be collapsible
		heightStyle: "content"  // allow the accordion panel to keep its original height
	});
});

/*
$( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
 
    $( "#opener" ).on( "click", function() {
      $( "#dialog" ).dialog( "open" );
    });
});
*/

function myXHR(t,d){
	return $.ajax({		
		type:t,
		cache:false,
		async:true,
		dataType:'json',
		url:'proxy.php',
		data:d, 
		beforeSend:function(){
			//do something before sending
		}
	}).always(function(){
		//do this no matter what			
	}).fail(function(){
		//handle failure			
	});			
}//end function myXHR

/* -------------- check browser --------------------*/
var browser;

function checkBrowser(){
	if(document.getElementById && document.attachEvent){	
		//modern IE
		browser = 'modIE';
	}
	else if(document.getElementById){	
		//modern, non-IE
		browser = 'gecko';
	}
	else{		
		//ask to download new browser
		window.location = "browser.html";
	}
} // end checkBrowser


$(document).ready(function(){
		
	//about page
	myXHR('get',{'path':'/about/'}).done(function(json){
		
		console.log(json);	
			
		var x = '<h2>' + json.title+'</h2>';
			x+= '<p>'+json.description+'</p>';
			x+= '<p id="quote">'+json.quote+'</p>';
			x+= '<p id="quoteAuthor">~'+json.quoteAuthor+'</p>';
		
		$('#about').html(x);
	});	//end about page
	
	
	//undergraduate page
	myXHR('get',{'path':'/degrees/undergraduate/'}).done(function(json){
		console.log(json);
		// topic for undergraduate 
		var topic = '<h2><p class = "topic"> Our Undergraduate Degrees </p></h2>';
		
		// start div for x, underTabs is tabs for undergraduate
		var x= '<div id = "underTabs">'; 
		x += '<ul>';  // start ul for x
		
		var pop ='';	
		// have array to decode and display
		$.each(json.undergraduate,function(i,item){
			x += '<li><a href =#'+item.degreeName+'>' + item.title + '</a></li>';
			pop += '<div id=' + item.degreeName + '>';
			pop += '<p class="pDescr">' + item.description + '</p>';
			
			// display concentrations
			var con = '<ul>';  // start ul for concentrations
			$.each(item.concentrations,function(n,newItem){
				con += '<li class="liCon">' + newItem + '</li>';  // show concentrations in list
			});
			con += '</ul>';  // end ul for concentrations
			
			pop += con;  // add concentrations to pop
			pop += '</div>';  // end div
		});
		
		x += '</ul>' + pop;  // end ul and div for x
		
		$('#undergraduate').append(topic);	
		$('#undergraduate').append(x);
		$( "#underTabs" ).tabs();
	}); //end undergraduate page
	
	
	//graduate page
	myXHR('get',{'path':'/degrees/graduate/'}).done(function(json){
		console.log(json);
		
		// topic for graduate
		var topic = '<h2><p class = "topic"> Our Graduate Degrees </p></h2>';
		
		// start div for x, gradTabs is tabs for graduate
		var x = '<div id = "gradTabs">';
		x += '<ul>';  // start ul for x
		
		var pop = '';		
		// have array to decode and display
		$.each(json.graduate,function(i,item){	
			if(item.degreeName == "graduate advanced certificates"){
			
			}
			else{
				x += '<li><a href =#' + item.degreeName + '>' + item.title + '</a></li>';
			
				pop += '<div id=' + item.degreeName + '>' ;
				pop += '<p class="pDescr">' + item.description + '</p>';
				
				// display concentrations
				var cer = '<ul>';   //start ul for concentrations
				$.each(item.concentrations,function(n,newItem){
					cer += '<li class="liCon">' + newItem + '</li>';  // show concentrations in list
				});
				cer += '</ul>'; // end ul for concentrations
			
				pop += cer;  // add concentrations to pop
				pop += '</div>';  // end div for pop
			} // end else
		});
			
		x += '</ul>' + pop; // end ul for x, and add pop to x
		
		$('#graduate').append(topic);
		$('#graduate').append(x);
		$( "#gradTabs" ).tabs();
	}); //end graduate page
	
	
	// minors page
	myXHR('get',{'path':'/minors/'}).done(function(json){
		console.log(json);
		
		// topic for minors
		var topic = '<h2><p class="topic"> Our Undergraduate Minors</p></h2>';
		$('#minors').append(topic);
		
		var x =''; 
        x += '<div class="row">';  // start row div
        $.each(json.UgMinors,function(i,item){
			x += '<div class="column">';
            x += '<div class="box">';
            x += '<div class="box-content">';
            x += '<span class="box-title">'+item.title+'</span>';
            x += '<p class="pMinors">'+item.description+'</p>';
            x += '<h4>Concentrations</h4>';
			x += '<ul>';
                  
            $.each(item.courses, function(n,newItem){
				x += '<li>' + newItem + '</li>';
            });
            x += '</ul></div>';  // end box-content
            x += '</div></div><hr>';  // end box, column
        });
        x += '</div>';  // end row div

		$('#minors').append(x);
	}); //end minors page
	
	
	// employment introduction 
	myXHR('get',{'path':'/employment/introduction/'}).done(function(json){
		console.log(json);
		
		// topic for employment
		var topic = '<h2><p class="topic">Employment</p></h2>';
		$('#employment').append(topic);
		
		// title for introduction part
		var intro = '<h2>' + json.introduction.title + '</h2>';
		
		//display content of introduction
		var content = '<div>';
		$.each(json.introduction.content, function(n, newItem){
			content += '<p class="pEmpTitle">' + newItem.title + '</p>';
			content += '<p>' + newItem.description + '</p>';
		});
		
		content += '</div><hr>';  // end div for content
		intro += content;
		
		$('#employment').append(intro);
	}); //end employment introduction
	
	
	// employment degreeStatistics
	myXHR('get',{'path':'/employment/degreeStatistics/'}).done(function(json){
		console.log(json);
		
		// title for degreeStatistics part
		var intro = '<h2>' + json.degreeStatistics.title + '</h2>';
		
		// display degreeStatistics box
		var statis = '<div id="statBox">';
		$.each(json.degreeStatistics.statistics, function(n, newItem){
			statis += '<p>' + newItem.value + '</p>';
			statis += '<p>' + newItem.description + '</p>';
		});
		
		statis += '</div><hr>';  // end div for statis
		intro += statis;
		
		$('#employment').append(intro);
	}); //end employment degreeStatistics
	
	
	// employment employers
	myXHR('get',{'path':'/employment/employers/'}).done(function(json){
		console.log(json);
		
		// title for employers part
		var intro = '<h2>' + json.employers.title + '</h2>';
		
		// display employerNames
		var employer = '<p>';
		$.each(json.employers.employerNames, function(n, newItem){
			employer += newItem + ', ';
		});
		
		employer += '</p><hr>';  // end employer
		intro += employer;
		
		$('#employment').append(intro);
	}); //end employment employers
	
	
	// employment careers
	myXHR('get',{'path':'/employment/careers/'}).done(function(json){
		console.log(json);
		
		// title for careers part
		var intro = '<h2>' + json.careers.title + '</h2>';
		
		// display careers name
		var car = '<p>';
		$.each(json.careers.careerNames, function(n, newItem){
			car += newItem + ', ';
		});
		
		car += '</p><hr>';  // end car
		intro += car;
		
		$('#employment').append(intro);
	}); //end employment careers
	
	
	// employment coopTable
	myXHR('get',{'path':'/employment/coopTable/'}).done(function(json){
		console.log(json);
		
		// title for coopTable part
		var intro = '<h2>' + json.coopTable.title + '</h2>';
		
		// create a table for coopTable
		var coopT = '<div class="tables"><table>';  // start table
		coopT += '<tr class="table_header">';
		coopT += '<th>DEGREE</th>';
		coopT += '<th>EMPLOYER</th>';
		coopT += '<th>LOCATION</th>';
		coopT += '<th>TERM</th>';
		coopT += '</tr>';   // end table_header class
		
		// display data in the table
		$.each(json.coopTable.coopInformation, function(n, newItem){
			coopT += '<tr class="table_data">';
			coopT += '<td>' + newItem.degree + '</td>';
			coopT += '<td>' + newItem.employer + '</td>';
			coopT += '<td>' + newItem.city + '</td>';
			coopT += '<td>' + newItem.term + '</td>';
		});
		
		coopT += '</tr>';  // end tr for table_data
		coopT += '</table></div><hr>';  // end table
		
		intro += coopT;
		
		$('#employment').append(intro);
	}); //end employment coopTable
	
	
	// employment employmentTable
	myXHR('get',{'path':'/employment/employmentTable/'}).done(function(json){
		console.log(json);
		
		// title for employmentTable part
		var intro = '<h2>' + json.employmentTable.title + '</h2>';
		
		// create a table for employmentTable
		var empT = '<div class="tables"><table>';  // start table
		empT += '<tr class="table_header">';
		empT += '<th>DEGREE</th>';
		empT += '<th>EMPLOYER</th>';
		empT += '<th>LOCATION</th>';
		empT += '<th>TITLE</th>';
		empT += '<th>DATE</th>';
		empT += '</tr>';   // end table_header class
		
		// display data in the table
		$.each(json.employmentTable.professionalEmploymentInformation, function(n, newItem){
			empT += '<tr class="table_data">';
			empT += '<td>' + newItem.degree + '</td>';
			empT += '<td>' + newItem.employer + '</td>';
			empT += '<td>' + newItem.city + '</td>';
			empT += '<td>' + newItem.title + '</td>';
			empT += '<td>' + newItem.startDate + '</td>';
		});
		
		empT += '</tr>';  // end tr for table_data
		empT += '</table></div><hr>';  // end table
		
		intro += empT;
		
		$('#employment').append(intro);
	}); //end employment employmentTable
	
	
	// people faculty page
	myXHR('get',{'path':'/people/faculty/'}).done(function(json){
		console.log(json);
		// topic for faculty 
		var topic = '<h2><p class = "topic"> Our Faculty </p></h2>';
		$('#faculty').append(topic);
		
		/*var x = '';
		var y = '';
		
		$.each(json.faculty, function(i, item){
			x += '<div id="dialog" ';
			x += 'title="' + item.name + '">';
			x += '<p> Office:' + item.office + '</p>';
			x += '<p> Phone:' + item.phone + '</p>';
			x += '<p> Email:' + item.email + '</p>';
			x += '</div>';
			
			y += '<button class="button" id="opener">';
			y += item.name;
			y += '</button>';
		});
		$('#faculty').append(x);
		$('#faculty').append(y);   */
		$.each(json.faculty, function(i, item) {
			$('#faculty').append('<button id="peoButton">' + item.name + '</button>');
			$("#faculty button").eq(i).click(function() {
				var content = '<div class=col-sm-6><h4>' + item.title + '</h5>' +
					'<img width="120px" height="100px" src="' + item.imagePath + '"/>' +
					'<h4>' + item.tagline + '</h4></div>' +
					'<div class="col-sm-6">' +
					'<h4>Interest Area: ' + item.interestArea + '</h4>' + '</div>' +
					'<div class="col-sm-6">' + '<h6><i class="fa-fa-phone">' + 
					item.phone + '</i></h6>' + '<h6><i class="fa fa-envelope">' + 
					item.email + '</i></h6>' +'</div>';
				$.dialog({
					title: item.name,
					content: content,
					columnClass: 'small',
					type: 'dark',
					closeIcon: true,
					closeIconClass: 'fa fa-close',
					columnClass: 'large',
				});
			});
		});
	}); //end faculty page
	
	
	// people staff page
	myXHR('get',{'path':'/people/staff'}).done(function(json){
		console.log(json);
		// topic for faculty 
		var topic = '<h2><p class = "topic"> Our Staff </p></h2>';
		$('#staff').append(topic);
		/*var x = '';
		var y = '';
		
		$.each(json.staff, function(i, item){
			x += '<div id="dialog" ';
			x += 'title="' + item.name + '">';
			x += '<p> Username:' + item.username + '</p>';
			x += '<p> Email:' + item.email + '</p>';
			x += '</div>';
			
			y += '<button class="button" id="opener">';
			y += item.name;
			y += '</button>';
		});
		$('#staff').append(x);
		$('#staff').append(y);   */
		$.each(json.staff, function(i, item) {
			$('#staff').append('<button id="peoButton">' + item.name + '</button>');
			$("#staff button").eq(i).click(function() {
				var content = '<div class=col-sm-6><h4>' + item.title + '</h5>' +
					'<img width="120px" height="100px" src="' + item.imagePath + '"/>' +
					'<h4>' + item.tagline + '</h4></div>' +
					'<div class="col-sm-6">' +
					'<h4>Interest Area: ' + item.interestArea + '</h4>' +'</div>' +
					'<div class="col-sm-6">' + '<h6><i class="fa-fa-phone">' + 
					item.phone + '</i></h6>' + '<h6><i class="fa fa-envelope">' 
					+ item.email + '</i></h6>' + '</div>';
				$.dialog({
					title: item.name,
					content: content,
					columnClass: 'small',
					type: 'dark',
					closeIcon: true,
					closeIconClass: 'fa fa-close',
					columnClass: 'large',
				});
			});
		});
	}); //end staff page
	
	
	// research by interest area page
	myXHR('get',{'path':'/research/byInterestArea'}).done(function(json){
		console.log(json);
		
		// topic for graduate
		var topic = '<h2><p class = "topic">Faculty Research: Areas of Interest</p></h2>';
		$('#research-area').append(topic);
		
		var x = '<div>';
		var areas ='';
		$.each(json.byInterestArea, function(i,item){	
			// get the areaName
			areas += '<h2>'+item.areaName+'</h2>';
			
			// display the citations
			var cita ='<div><ul>';
			$.each(item.citations, function(n,newItem){			
				cita += '<li>'+ newItem + '</li>';		
			});
				
			cita += '</ul></div><hr>';  // end ul and div for cita
			areas += cita;
		});
		
		x += areas + '</div>';  //end div for x
		$('#research-area').append(x);
	}); //end research by interest area page
	
	
	// research by faculty page
	myXHR('get',{'path':'/research/byFaculty'}).done(function(json){
		console.log(json);
		
		// topic for graduate
		var topic = '<h2><p class = "topic">Faculty Research: Lookup by Faculty</p></h2>';
		$('#research-faculty').append(topic);
		
		var x = '<div>';
		var areas ='';
		$.each(json.byFaculty, function(i,item){	
			// get the facultyName
			areas += '<h2>'+item.facultyName+'</h2>';
			
			// display the citations
			var cita ='<div><ul>';
			$.each(item.citations, function(n,newItem){			
				cita += '<li>'+ newItem + '</li>';		
			});
				
			cita += '</ul></div><hr>';  // end ul and div for cita
			areas += cita;
		});
		
		x += areas + '</div>';  //end div for x
		$('#research-faculty').append(x);
	}); //end research by faculty page
	
	
	// resources co-op enrollment page
	myXHR('get',{'path':'/resources/coopEnrollment/'}).done(function(json){
		console.log(json);
		
		// title for co-op enrollment part
		var intro = '<h2 class="topic">' + json.coopEnrollment.title + '</h2>';
		
		//display coopEnrollment information
		var infor = '<div>';
		$.each(json.coopEnrollment.enrollmentInformationContent, function(n, newItem){
			infor += '<h2>' + newItem.title + '</h2>';
			infor += '<p>' + newItem.description + '</p><hr>';
		});
		
		infor += '</div>';  // end infor
		intro += infor;
		
		$('#resources-coop').append(intro);
	}); //end resources co-op enrollment page
	
	
	// resources tutor and lab information page
	myXHR('get',{'path':'/resources/tutorsAndLabInformation/'}).done(function(json){
		console.log(json);
		// title for co-op enrollment part
		var intro = '<h2 class="topic">' + json.tutorsAndLabInformation.title + '</h2>';
		
		//display coopEnrollment information
		intro += '<p>' + json.tutorsAndLabInformation.description + '</p>';
		intro += '<p><a href="' +  json.tutorsAndLabInformation.tutoringLabHoursLink
			+ '">'+ json.tutorsAndLabInformation.tutoringLabHoursLink + '</a></p>';
		
		$('#resources-tutor').append(intro);
	}); //end resources tutor and lab information page
	
	
	// resources student services page
	myXHR('get',{'path':'/resources/studentServices/'}).done(function(json){
		console.log(json);
		// title for co-op enrollment part
		var intro = '<h2 class="topic">' + json.studentServices.title + '</h2>';
		
		// display academic advisors information
		var aca = '<h2>' + json.studentServices.academicAdvisors.title + '</h2>';
		aca += '<p>' + json.studentServices.academicAdvisors.description + '</p><hr>';
		
		// display faculty advisors
		var fac = '<h2>' + json.studentServices.facultyAdvisors.title + '</h2>';
		fac += '<p>' + json.studentServices.facultyAdvisors.description + '</p><hr>';
		
		$('#resources-services').append(intro);
		$('#resources-services').append(aca);
		$('#resources-services').append(fac);
	}); //end resources student services page
	
	
	// resources student ambassadors page
	myXHR('get',{'path':'/resources/studentAmbassadors/'}).done(function(json){
		console.log(json);
		// title for co-op enrollment part
		var intro = '<h2 class="topic">' + json.studentAmbassadors.title + '</h2>';
		
		// display sub section content
		var sub = '<div>';
		$.each(json.studentAmbassadors.subSectionContent, function(n, newItem){
			sub += '<h2>' + newItem.title + '</h2>';
			sub += '<p>' + newItem.description + '</p><hr>';
		});
		sub += '</div>';
		intro += sub;
		
		$('#resources-ambass').append(intro);
	}); //end resources student ambassadors page
	
	
	// resources study abroad page
	myXHR('get',{'path':'/resources/studyAbroad/'}).done(function(json){
		console.log(json);
		// title for co-op enrollment part
		var intro = '<h2 class="topic">' + json.studyAbroad.title + '</h2>';
		var des = '<p>' + json.studyAbroad.description + '</p>';
		
		// display study abroad places
		var pla = '<div>';
		$.each(json.studyAbroad.places, function(n, newItem){
			pla += '<h2>' + newItem.nameOfPlace + '</h2>';
			pla += '<p>' + newItem.description + '</p><hr>';
		});
		pla += '</div>';
		
		$('#resources-abroad').append(intro);
		$('#resources-abroad').append(des);
		$('#resources-abroad').append(pla);
	}); //end resources study abroad page
	
	
	// news page
	myXHR('get',{'path':'/footer/quickLinks'}).done(function(json){
		console.log(json);

		var intro = '<div">';
		$.each(json.quickLinks, function(i, item){
			intro += '<a href ="' + item.href + '">' + item.title +'</a>';
		});
		intro += '</div>';
		
		$('#footer').append(intro);
	}); //end new page
});	
