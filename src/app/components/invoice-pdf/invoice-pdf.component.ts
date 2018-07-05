import {Component, OnInit} from '@angular/core';
import printJS from 'print-js';
import {AuthService} from '../../services/auth.service';
import {InvoiceService} from '../../services/invoice.service';
import {OrderService} from '../../services/order.service';
import b64toBlob from 'b64-to-blob';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.css']
})
export class InvoicePdfComponent {

  // screen DPI / PDF DPI
  // readonly dpiRatio = 96 / 72;

  pdfSrc: any; // = 'http://localhost:10270/api/invoice';
  pdfScr2: any;

  constructor(private auth: AuthService,
              private invoiceService: InvoiceService,
              private orderService: OrderService) {
    // this.pdfSrc = auth.API_URL + '/invoice';
    console.log('this.orderService.order', this.orderService.order);
    invoiceService.createInvoice(this.orderService.order)
      .subscribe((data: any) => {
        console.log('data', data);
        this.pdfSrc = 'data:application/pdf;base64,' + data.pdf;
        this.pdfScr2 = data.pdf;
      });
  }


  // private addInput(annotation: PDFAnnotationData, rect: number[] = null): void {
  //   // add input to page
  //   console.log(annotation);
  // }
  //
  //
  // loadComplete(pdf: PDFDocumentProxy): void {
  //   for (let i = 1; i <= pdf.numPages; i++) {
  //
  //     // track the current page
  //     let currentPage = null;
  //     pdf.getPage(i).then(p => {
  //       currentPage = p;
  //
  //       // get the annotations of the current page
  //       return p.getAnnotations();
  //     }).then(ann => {
  //
  //       // ugly cast due to missing typescript definitions
  //       // please contribute to complete @types/pdfjs-dist
  //       const annotations = (<any>ann) as PDFAnnotationData[];
  //
  //       annotations
  //         .filter(a => a.subtype === 'Widget') // get the form field annotation only
  //         .forEach(a => {
  //
  //           // get the rectangle that represent the single field
  //           // and resize it according to the current DPI
  //           const fieldRect = currentPage.getViewport(this.dpiRatio)
  //             .convertToViewportRectangle(a.rect);
  //
  //           // add the corresponding input
  //           this.addInput(a, fieldRect);
  //         });
  //     });
  //   }
  // }

  printPdf() {
    printJS({
      printable: this.auth.API_URL + '/invoice',
      type: 'pdf',
      showModal: true,
      token: this.auth.token
    });

    // const blob = this.b64toBlob(this.pdfScr2, 'application/pdf');
    // let blob = b64toBlob(this.pdfScr2, 'application/pdf');
    // let fileUrl = window.URL.createObjectURL(blob);
    // window.frames['my-frame'].src = fileUrl;
    // window.frames['my-frame'].print();
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

}
