var tableLoad = $(document).ready(function() {
    // GetPermissions()
    var token = sessionStorage.getItem("UserDetails");
    var access = JSON.parse(token)
//    $('#dropdownid').not('.disabled').formSelect();

//    if (localStorage.getItem("Supseruser") === "true") {
//        localStorage.removeItem("Superuser");
//    }
    $('#booked-courses-datatable').removeAttr('width').DataTable({
        dom: 'frtlip',
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/booked_courses_list/",
            "type": "GET",
            "headers": { Authorization: 'Bearer ' + access.access },
            "error": function(data) {
                // alert(data.status)
                if (data.status == 401) {
                    let get_url = "/dashboard//"
//                    getaccessTokenForUrl(get_url);

                } else {
                    console.log(data);
//                    M.toast({ html: JSON.parse(data.responseText).message, classes: 'red rounded' })
                }
            }
        },
        "columns": [{
                "data": null,
                render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { "data": "student" },
            { "data": "course" },
            { "data": "location" },
            { "data": "start_date" },
            { "data": "end_date" },
            {
                "data": "id",
                "render": function(data) {
                    var all_perms = '<button class="edit_btn" id=' + data + ' onclick=getBookedCourse('+ data +') style="width:70px;"><i class="fa fa-edit">Edit</i></button> <button style="width:70px;" href="#deleteEmployeeModal" onclick="setBookedCourse('+ data +')" class="delete" data-id="'+ data +'" data-toggle="modal"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>'
                    var edit_view = '<button class="edit_btn" id=' + data + ' onclick=editCoach('+ data +') style="width:70px;"><i class="material-icons prefix">Edit</i></button> <button class="view_btn" id=' + data + ' onclick=deleteUser(id) style="width:70px;"><i class="material-icons prefix">visibility</i></button>'
                    var only_view = '<button class="view_btn" id=' + data + ' onclick=editCoach('+ data +') style="width:70px;"><i class="material-icons prefix">visibility</i></button>'

//                    return all_perms
                    var userPermissions = localStorage.getItem('UserPermissions')

//
                    if (!jQuery.isEmptyObject(userPermissions)) {

                        var delete_user_flag = userPermissions.includes('book_course_delete_button')
                        var edit_user_flag = userPermissions.includes('book_courses_edit_button')
                        var view_user_flag = userPermissions.includes('view_user_get')

                        if (delete_user_flag == true && edit_user_flag == true) {
                            return all_perms
                        } else if (delete_user_flag == false && edit_user_flag == true) {
                            return edit_view
                        }
                        else {
                            return 'no action'
                        }
                    // var all_perms = '<button class="edit_btn" id='+data+' onclick=getEditReport(id)><i class="material-icons prefix">mode_edit</i></button> <button class="view_btn" id='+data+' onclick=getViewReport(id)><i class="material-icons prefix">visibility</i></button><button class="delete_btn" id='+data+' onclick=getDeleteReport(id)><i class="material-icons prefix">delete</i></button> '
                    // return all_perms
                }
                }
            },

        ],
        "columnDefs": [
            { "className": "dt-center", "targets": "_all" }
        ],
    });
    //lengthmenu -> add a margin to the right and reset clear
    $(".dataTables_length").css('clear', 'none');
    $(".dataTables_length").css('margin-right', '20px');

    //info -> reset clear and padding
    $(".dataTables_info").css('clear', 'none');
    $(".dataTables_info").css('padding', '0');
    // Call datatables, and return the API to the variable for use in our code
    // Binds datatables to all elements with a class of datatable
    var table = $("#booked-courses-datatable").dataTable().api();
    // var table = $('#user_datatable').DataTable();

    // table.columns.adjust().draw();
    // Grab the datatables input box and alter how it is bound to events
    $(".dataTables_filter input")
        .unbind() // Unbind previous default bindings
        .bind("input", function(e) { // Bind our desired behavior
            // If the length is 3 or more characters, or the user pressed ENTER, search
            if (this.value.length >= 3 || e.keyCode == 13) {
                // Call the API search function
                table.search(this.value).draw();
            }
            // Ensure we clear the search if they backspace far enough
            if (this.value == "") {
                table.search("").draw();
            }
            return;
        });


});

$.fn.dataTable.ext.errMode = function(settings, helpPage, message) {
    console.log(message);
};

function getBookedCourse(id){
    localStorage.setItem('booked_course',id)
    window.location.href = "/book_courses_edit/"
}

function setBookedCourse(id){
    $('#booked_course_id').val(id);
}

function deleteBookedCourseRecord(){
     var token = sessionStorage.getItem("UserDetails");
    var access = JSON.parse(token)
    id = $('#booked_course_id').val();
    $.ajax({
        type: 'delete',
        url: '/book_course/'+id,
        headers: { Authorization: 'Bearer ' + access.access },
        data: {

        },
        success: function(data) {
            location.reload();
        },
        error: function(data) {
                console.log(data);
        },
    });
}
