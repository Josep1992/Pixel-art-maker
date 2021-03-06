let height,
  weight,
  grid,
  form,
  color,
  tableRow,
  tableCell,
  resetBtn,
  clearBtn,
  mouseDrag;

height = $('#inputHeight');
width = $('#inputWeight');
color = $('#colorPicker');

canvas = $('#pixelCanvas');
form = $('#sizePicker');

resetBtn = $('#reset');
clearBtn = $('#clear');

const makeGrid = () => {
  for (row = 0; row < height.val(); row++) {
    tableRow = $('<tr></tr>');
    for (column = 0; column < width.val(); column++) {
      tableCell = $('<td></td>');
      tableRow.append(tableCell);
    }
    canvas.append(tableRow);
  }
};

// Initialize spectrum color input
// $('#colorPicker').spectrum({
//   color: '#333'
// });

//Starts the page with a grid of 10 table rows and 10 table cells
makeGrid();

// On submit form creates a grid with the given values on each input
form.on('submit', e => {
  // remove any previous grid
  canvas.children().remove();
  // Build's grid
  makeGrid();
  e.preventDefault();
});

// On click table cell background becomes that of the color input
canvas.on('click', 'td', function() {
  $(this).css('background-color', `${color.val()}`);
});

// On double click table cell background becomes transparent
canvas.on('dblclick', 'td', function() {
  $(this).css('background-color', 'transparent');
});

// On mouse over paint
canvas.on('mousedown', 'td', function() {
  mouseDrag = true;
  canvas.on('mouseover', 'td', function() {
    if (mouseDrag == true) {
      $(this).css('background-color', `${color.val()}`);
    }
    canvas.on('mouseup', 'td', function() {
      mouseDrag = false;
      if (mouseDrag == false) {
        $(this).css('background-color', 'none');
      }
    });
  });
});

// On mouse down on the reset button reload page.
resetBtn.on('mousedown', () => {
  window.location.reload();
});

// on mouse down clears the colors of the grid
clearBtn.on('mousedown', () => {
  $('td').css('background-color', 'transparent');
});
