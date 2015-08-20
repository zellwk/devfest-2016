import _ from 'lodash'; 
import $ from 'jquery';
import testing from './testing';

testing();

let arr = [4, 5, 6]; 

_.forEach(arr, (num, index) => {console.log(num, index);})

// import highlight from 'highlight';

// $(document).ready(function() {
//   $('pre code').each(function(i, block) {
//     highlight.highlightBlock(block);
//   });
// });