
//////////////////display function
const render = function () {
    runListQuery();
};

const renderList = function (outputPlace, dataList) {
    for (let i = 0; i < dataList.length; i++) {
        const output = $(outputPlace);
        const temp = $(`<div class='entry'>`);
        const tempButton = $('<span class=left>');
        tempButton.append($("<button type='submit' class='delEntry'>").append($("<img src='./trash-alt-solid.svg' style='height:18px;'/>")));
        const tempSpan = $("<span class='entryText'>").text(`${dataList[i].newInput}`);
        temp.append(
            $("<input type='checkbox' class='inputBox'>"),
            tempSpan,
            tempButton
        );
        output.append(temp);
    }
};

const runListQuery = function () {
    $.ajax({ url: "/api/list", method: "GET" }).then(
        function (e) {
            renderList('#displayList', e);
        }
    );
}

/*
const clearList = function(){
    alert("Clearing...");
    $.ajax({url:"/api/clear", method:"POST"}).then(
        function(){
            $("#displayList").empty();
        }
    );
}
$("#clear").on("click",clearList);
*/

render();

///////////////////////////submit function
const submitFunc = function () {
    console.log('get in submit');
    //event.preventDefault();


    const newEntry = {
        newInput: $('#newInput').val().trim()
        //id: count
    };
    console.log(newEntry);
    for (let key in newEntry) {
        if (newEntry[key] === '') {
            alert('Please enter the task');
            return;
        }
    }

    $.ajax({ url: '/api/list', method: 'POST', data: newEntry }).then(
        function (data) {
            if (data.success) {
                console.log('input data in post method ajax', data);
                alert('You just added a new entry!');
                $('#newInput').val('');
            } else {
                alert("There's a problem with your submision");
            }

        }
    );
};
console.log('in app.js');


$(document).on('click', '#submitButton', submitFunc);


//////////////////////////////////////////////

//////////delete Function////////////////
const deleteFunc = function () {
    console.log('get in delete');
    let parent = $(this).parent().parent().text();
    const selEntry = {
        newInput: parent
    };
    console.log(selEntry);
    $.ajax({ url: '/api/list', method: 'DELETE', data: selEntry }).then(
        function (data) {
            console.log(data.success);
            if (data.success) {
                console.log('input data in delete method ajax', data);
                alert('You just deleted an entry!');
            } else {
                alert("There's a problem with your submision");
            }

        }
    );

};


$(document).on('click', '.delEntry', deleteFunc);


/////////put function/////////////
/*
const putFunc = function () {
    console.log('get in putFunc');
    let parent = $(this).parent();
    const selEntry = parent.text();
    const tempButton = $('<span class=left>');
        tempButton.append($("<button type='submit' class='delEntry'>").append($("<img src='./plus-square-regular.svg' style='height:18px;'/>")));
    const toggleEntryPast = parent.childNodes[1];
     parent.childNodes[1].html = 
     `<input type="text" class="toggleInput" value='${toggleEntryPast.text()}' style="width: 300px"/>
     <button type='submit' id="submitButton">`;
     parent.childNodes[2].html= `${tempButton}`;

    $(document).on('click', '#updateButton', function () {
        const updateEntry = {
            newInput: $('#newInput').val().trim()
        };

        console.log(selEntry);
        $.ajax({ url: '/api/list/:selEntry', method: 'PUT', data: updateEntry }).then(
            function (data) {
                console.log(data.success);
                if (data.success) {
                    console.log('input data in put method ajax', data);
                    alert('You just updated a new entry!');
                } else {
                    alert("There's a problem with your submision");
                }

            }
        );
    });
};


$(document).on('click', '.inputBox', putFunc);
*/





