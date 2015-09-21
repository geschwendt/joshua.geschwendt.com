// 'use strict';

// @Const()
// export class SvgElement {
//   element = undefined;
//   path = [];
//   size = [];
//   keyframe  =  0;
//   keyframes = 60;
//   handle = 0;
//   finished = false;
  	
//   constructor(element) {
//     this.element = element;
//     this.activate();	
//   }
  
//   activate() {
//     [].slice.call(this.element.querySelectorAll('path'))
//       .forEach((path, index) => {
//         this.path[index] = path;
//         this.size[index] = path.getTotalLength();
//         this.path[index].style.strokeDasharray  = this.size[index];
//         this.path[index].style.strokeDashoffset = this.size[index];
//       });
//     this.render();	  
//   }
  
//   render() {
//     if (this.finished) { return; }
//     this.finished = true;
//     this.animate();	  
//   }
  
//   animate() {
//     var progress = this.keyframe / this.keyframes;
//     if (progress > 1) {
//       window.cancelKeyframe(this.handle); }
//     else {
//       this.keyframe++;
//       for (var i = 0; i < this.path.length; i++) {
//         if (progress > 0.75) { 
//           this.path[i].style.fill = '#fff'; 
//         }
		
//         this.path[i].style.strokeDashoffset =
//         Math.floor(this.size[i] * (1 - progress));
//       }
//       this.handle = window.requestKeyframe(() => {
//         this.animate();
//       });
//     }
//   }
// }