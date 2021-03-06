var app = app || {};

app.booksViews = (function () {
    function showAllBooks(selector, data) {
        $.get('templates/books.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#addNewBook').on('click', function(e) {
                Sammy(function () {
                    this.trigger('redirectUrl', {url:'#/addNewBook'});
                })
            });
            $('.addAuthor').on('click', function(e) {
                var parent = $(this).parent(),
                    bookId = parent.attr('data-id');
                Sammy(function () {
                    this.trigger('show-add-author', {parent: parent, bookId: bookId})
                })
            })
        })
    }

    function showAddNewBook(selector) {
        $.get('templates/addNewBook.html', function (templ) {
            $(selector).html(templ);
            $('#addNewBook').on('click', function() {
                var title = $('#title').val();
                Sammy(function () {
                    this.trigger('add-new-book', {title: title});
                });
            })
        })
    }

    return {
        load: function () {
            return {
                showAllBooks: showAllBooks,
                showAddNewBook: showAddNewBook
            }
        }
    }
}());