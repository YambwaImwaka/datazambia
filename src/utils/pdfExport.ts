
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

interface PdfExportOptions {
  title: string;
  fileName: string;
  subtitle?: string;
  author?: string;
  tableData?: any[];
  tableColumns?: string[];
  additionalText?: string;
  chartImgUrl?: string;
  footerText?: string;
}

/**
 * Generate and download a PDF report
 */
export const exportToPdf = (options: PdfExportOptions): void => {
  try {
    const {
      title,
      fileName,
      subtitle,
      author = "Zambia Economic Dashboard",
      tableData,
      tableColumns,
      additionalText,
      chartImgUrl,
      footerText
    } = options;

    // Create new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Add metadata
    doc.setProperties({
      title,
      author,
      subject: subtitle || title,
      keywords: "Zambia, economics, data, report",
      creator: "Zambia Economic Dashboard"
    });
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(title, pageWidth / 2, 20, { align: "center" });
    
    // Add subtitle if provided
    if (subtitle) {
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(subtitle, pageWidth / 2, 30, { align: "center" });
    }
    
    // Add date
    const currentDate = new Date().toLocaleDateString("en-ZM", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, pageWidth / 2, 40, { align: "center" });
    
    let yPosition = 50;
    
    // Add chart image if provided
    if (chartImgUrl) {
      try {
        doc.addImage(chartImgUrl, "PNG", 20, yPosition, pageWidth - 40, 60);
        yPosition += 70;
      } catch (e) {
        console.error("Error adding chart image to PDF", e);
      }
    }
    
    // Add table if data is provided
    if (tableData && tableData.length > 0 && tableColumns && tableColumns.length > 0) {
      // Process data for the table
      const tableHeaders = tableColumns.map(col => ({ 
        title: col, 
        dataKey: col 
      }));
      
      autoTable(doc, {
        startY: yPosition,
        head: [tableColumns],
        body: tableData.map(row => {
          // Handle both array and object row formats
          if (Array.isArray(row)) {
            return row;
          } else {
            return tableColumns.map(col => row[col] || "");
          }
        }),
        margin: { top: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] }
      });
      
      yPosition = (doc as any).lastAutoTable.finalY + 10;
    }
    
    // Add additional text if provided
    if (additionalText) {
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      // Split text into lines to prevent overflow
      const textLines = doc.splitTextToSize(additionalText, pageWidth - 40);
      doc.text(textLines, 20, yPosition);
      
      yPosition += textLines.length * 7 + 10;
    }
    
    // Add footer
    if (footerText) {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(footerText, pageWidth / 2, doc.internal.pageSize.height - 10, { 
        align: "center" 
      });
    } else {
      // Default footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        "This report was generated automatically by the Zambia Economic Dashboard. Data should be verified with official sources.",
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }
    
    // Save PDF
    doc.save(`${fileName}.pdf`);
    toast.success("PDF report generated successfully");
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate PDF report");
  }
};
