$(document).ready(function () {
    // prepare the data
    var data = new Array();
    var firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven", "Michael", "Robert", "Laura", "Anne"];
    var lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth"];
    var titles = ["Sales Representative", "Vice President, Sales", "Sales Representative", "Sales Representative", "Sales Manager", "Sales Representative", "Sales Representative", "Inside Sales Coordinator", "Sales Representative"];
    var titleofcourtesy = ["Ms.", "Dr.", "Ms.", "Mrs.", "Mr.", "Mr.", "Mr.", "Ms.", "Ms."];
    var birthdate = ["08-Dec-48", "19-Feb-52", "30-Aug-63", "19-Sep-37", "04-Mar-55", "02-Jul-63", "29-May-60", "09-Jan-58", "27-Jan-66"];
    var hiredate = ["01-May-92", "14-Aug-92", "01-Apr-92", "03-May-93", "17-Oct-93", "17-Oct-93", "02-Jan-94", "05-Mar-94", "15-Nov-94"];
    var address = ["507 - 20th Ave. E. Apt. 2A", "908 W. Capital Way", "722 Moss Bay Blvd.", "4110 Old Redmond Rd.", "14 Garrett Hill", "Coventry House", "Miner Rd.", "Edgeham Hollow", "Winchester Way", "4726 - 11th Ave. N.E.", "7 Houndstooth Rd."];
    var city = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "London", "London", "Seattle", "London"];
    var postalcode = ["98122", "98401", "98033", "98052", "SW1 8JR", "EC2 7JR", "RG1 9SP", "98105", "WG2 7LT"];
    var country = ["USA", "USA", "USA", "USA", "UK", "UK", "UK", "USA", "UK"];
    var homephone = ["(206) 555-9857", "(206) 555-9482", "(206) 555-3412", "(206) 555-8122", "(71) 555-4848", "(71) 555-7773", "(71) 555-5598", "(206) 555-1189", "(71) 555-4444"];
    var notes = ["Education includes a BA in psychology from Colorado State University in 1970.  She also completed 'The Art of the Cold Call.'  Nancy is a member of Toastmasters International.",
        "Andrew received his BTS commercial in 1974 and a Ph.D. in international marketing from the University of Dallas in 1981.  He is fluent in French and Italian and reads German.  He joined the company as a sales representative, was promoted to sales manager in January 1992 and to vice president of sales in March 1993.  Andrew is a member of the Sales Management Roundtable, the Seattle Chamber of Commerce, and the Pacific Rim Importers Association.",
        "Janet has a BS degree in chemistry from Boston College (1984).  She has also completed a certificate program in food retailing management.  Janet was hired as a sales associate in 1991 and promoted to sales representative in February 1992.",
        "Margaret holds a BA in English literature from Concordia College (1958) and an MA from the American Institute of Culinary Arts (1966).  She was assigned to the London office temporarily from July through November 1992.",
        "Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree in 1976.  Upon joining the company as a sales representative in 1992, he spent 6 months in an orientation program at the Seattle office and then returned to his permanent post in London.  He was promoted to sales manager in March 1993.  Mr. Buchanan has completed the courses 'Successful Telemarketing' and 'International Sales Management.'  He is fluent in French.",
        "Michael is a graduate of Sussex University (MA, economics, 1983) and the University of California at Los Angeles (MBA, marketing, 1986).  He has also taken the courses 'Multi-Cultural Selling' and 'Time Management for the Sales Professional.'  He is fluent in Japanese and can read and write French, Portuguese, and Spanish.",
        "Robert King served in the Peace Corps and traveled extensively before completing his degree in English at the University of Michigan in 1992, the year he joined the company.  After completing a course entitled 'Selling in Europe,' he was transferred to the London office in March 1993.",
        "Laura received a BA in psychology from the University of Washington.  She has also completed a course in business French.  She reads and writes French.",
        "Anne has a BA degree in English from St. Lawrence College.  She is fluent in French and German."];
    var k = 0;
    for (var i = 0; i < firstNames.length; i++) {
        var row = {};
        row["name"] = firstNames[k] + " " + lastNames[k];
        row["firstname"] = firstNames[k];
        row["lastname"] = lastNames[k];
        row["title"] = titles[k];
        row["titleofcourtesy"] = titleofcourtesy[k];
        row["birthdate"] = birthdate[k];
        row["hiredate"] = hiredate[k];
        row["address"] = address[k];
        row["city"] = city[k];
        row["postalcode"] = postalcode[k];
        row["country"] = country[k];
        row["homephone"] = homephone[k];
        row["notes"] = notes[k];
        data[i] = row;
        k++;
    }
    var source =
    {
        localdata: data,
        datatype: "array"
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // Create jqxGrid.
    $("#grid").jqxGrid(
        {
            width: 600,
            source: dataAdapter,
            rowsheight: 90,
            columns: [
                {
                    text: 'Picture', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false, dataField: '', width: '10%',
                    /*createwidget: function (row, column, value, htmlElement) {
                        var datarecord = value;
                        var imgurl = '../../images/' + value.toLowerCase() + '.png';
                        var img = '<img style="margin-top: 8px;" height="50" width="40" src="' + imgurl + '"/>';
                        var button = $("<div style='border:none;'>" + img + "<div class='buttonValue'>" + value + "</div></div>");
                        $(htmlElement).append(button);
                        button.jqxButton({ template: "success", height: '100%', width: '100%' });
                        button.click(function (event) {
                            var clickedButton = button.find(".buttonValue")[0].innerHTML;
                            alert(clickedButton);
                        });
                      },
                    initwidget: function (row, column, value, htmlElement) {
                        var imgurl = '../../images/' + value.toLowerCase() + '.png';
                        $(htmlElement).find('.buttonValue')[0].innerHTML = value;
                        $(htmlElement).find('img')[0].src = imgurl;
                    }*/
                    /*createwidget: function (row, column, value, htmlElement) {
                        var rowData = row.bounddata;
                        var button = $("<div style='border:none;'><div class='dropdown'><button class='btn btn-secondary dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button>\
                        <div class='dropdown-menu dropdown-menu-right'>\
                            <a href='javascript:;' target='_blank' class='dropdown-item'>View Detail "+rowData.name+"</a>\
                            <a href='javascript:;' target='_blank' class='dropdown-item'>Edit Detail "+rowData.name+"</a>\
                        </div></div></div>");
                        $(htmlElement).append(button);

                        appendDropDownMenuToBody()
                    },
                    initwidget: function (row, column, value, htmlElement) {

                    }*/
                },
                { text: 'Name', datafield: 'name', width: 200 },
                { text: 'Title', datafield: 'title', width: 200,
                    createwidget: function (row, column, value, htmlElement) {
                        var button = $("<div style='border:none;'><div class='dropdown'><button class='btn btn-secondary dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button>\
                        <div class='dropdown-menu dropdown-menu-right'>\
                        </div></div></div>");
                        $(htmlElement).append(button);
                        var html = "<a href='javascript:;' target='_blank' class='dropdown-item'>"+value+"</a>";
                        $(htmlElement).find('.dropdown-menu')[0].innerHTML = html;

                        appendDropDownMenuToBody();
                    },
                    initwidget: function (row, column, value, htmlElement) {
                        var html = "<a href='javascript:;' target='_blank' class='dropdown-item'>"+value+"</a>";
                        $(htmlElement).find('.dropdown-menu')[0].innerHTML = html;
                    }
                },
                { text: 'Country', datafield: 'country' }
            ]
        });

    $("#grid").on('cellclick', function (event) {
        event.args.originalEvent.preventDefault()
    })

    function appendDropDownMenuToBody() {
        // hold onto the drop down menu                                             
        var dropdownMenu;

        // and when you show it, move it to the body                                     
        $(window).on('show.bs.dropdown', function (e) {

            // grab the menu        
            dropdownMenu = $(e.target).find('.dropdown-menu');

            // detach it and append it to the body
            $('body').append(dropdownMenu.detach());

            // grab the new offset position
            var eOffset = $(e.target).offset();

            // make sure to place it where it would normally go (this could be improved)
            dropdownMenu.css({
                'display': 'block',
                'top': eOffset.top + $(e.target).outerHeight(),
                'left': eOffset.left
            });
        });

        // and when you hide it, reattach the drop down, and hide it normally                                                   
        $(window).on('hide.bs.dropdown', function (e) {
            $(e.target).append(dropdownMenu.detach());
            dropdownMenu.hide();
        });
    }
});