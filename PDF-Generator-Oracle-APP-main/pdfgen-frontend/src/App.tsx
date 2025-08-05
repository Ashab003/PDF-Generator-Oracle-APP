import React, { useState } from 'react';
import { Plus, Trash2, Download, FileText, Building, User, Package, Loader2 } from 'lucide-react';

// TypeScript interfaces matching your Java models exactly
interface Item {
  name: string;
  quantity: string;
  rate: number;
  amount: number;
}

interface InvoiceRequest {
  seller: string;
  sellerGstin: string;
  sellerAddress: string;
  buyer: string;
  buyerGstin: string;
  buyerAddress: string;
  items: Item[];
}

const InvoicePDFGenerator: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const [invoiceData, setInvoiceData] = useState<InvoiceRequest>({
    seller: '',
    sellerGstin: '',
    sellerAddress: '',
    buyer: '',
    buyerGstin: '',
    buyerAddress: '',
    items: [
      { name: '', quantity: '', rate: 0, amount: 0 }
    ]
  });

  // Styles for beautiful UI
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    wrapper: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    headerCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      padding: '3rem',
      marginBottom: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '1rem'
    },
    headerIcon: {
      width: '3rem',
      height: '3rem',
      color: '#4f46e5',
      filter: 'drop-shadow(0 4px 8px rgba(79, 70, 229, 0.3))'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0,
      letterSpacing: '-0.02em'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '1.25rem',
      margin: 0,
      fontWeight: '500'
    },
    alert: {
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '2rem',
      border: '1px solid',
      backdropFilter: 'blur(10px)'
    },
    alertError: {
      background: 'rgba(254, 242, 242, 0.9)',
      borderColor: '#fca5a5',
      color: '#dc2626'
    },
    alertSuccess: {
      background: 'rgba(240, 253, 244, 0.9)',
      borderColor: '#86efac',
      color: '#16a34a'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem'
    },
    formCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      padding: '2.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    formCardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    sectionIcon: {
      width: '1.5rem',
      height: '1.5rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1e293b',
      margin: 0
    },
    fieldGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.75rem'
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.8)',
      boxSizing: 'border-box' as const
    },
    inputFocus: {
      borderColor: '#4f46e5',
      boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
      background: 'white'
    },
    textarea: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.8)',
      resize: 'vertical' as const,
      minHeight: '100px',
      boxSizing: 'border-box' as const
    },
    itemsCard: {
      gridColumn: '1 / -1'
    },
    itemsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap' as const,
      gap: '1rem'
    },
    addButton: {
      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
      marginBottom: '2rem',
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '1.25rem',
      textAlign: 'left' as const,
      fontWeight: '700',
      color: '#1e293b',
      fontSize: '0.95rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    tableCell: {
      padding: '1.25rem',
      borderBottom: '1px solid #f1f5f9'
    },
    tableInput: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box' as const
    },
    amountCell: {
      padding: '0.75rem 1rem',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      borderRadius: '8px',
      color: '#16a34a',
      fontWeight: '700',
      fontSize: '1rem'
    },
    deleteButton: {
      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      color: '#dc2626',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    totalSection: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '2rem'
    },
    totalCard: {
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: 'white',
      padding: '1.5rem 2rem',
      borderRadius: '16px',
      boxShadow: '0 12px 24px rgba(30, 41, 59, 0.3)'
    },
    totalText: {
      fontSize: '1.5rem',
      fontWeight: '800',
      margin: 0
    },
    generateSection: {
      textAlign: 'center' as const,
      marginTop: '3rem'
    },
    generateButton: {
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      padding: '1.25rem 3rem',
      fontSize: '1.25rem',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 12px 24px rgba(79, 70, 229, 0.3)',
      letterSpacing: '0.025em'
    },
    generateButtonDisabled: {
      background: '#94a3b8',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    downloadButton: {
      background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
    },
    downloadButtonDisabled: {
      background: '#94a3b8',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    icon: {
      width: '1.25rem',
      height: '1.25rem'
    }
  };

  const handleInputChange = (field: keyof Omit<InvoiceRequest, 'items'>, value: string): void => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number): void => {
    const updatedItems: Item[] = [...invoiceData.items];
    (updatedItems[index] as any)[field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      const quantity: number = parseFloat(updatedItems[index].quantity) || 0;
      const rate: number = parseFloat(updatedItems[index].rate.toString()) || 0;
      updatedItems[index].amount = quantity * rate;
    }
    
    setInvoiceData(prev => ({ ...prev, items: updatedItems }));
  };

  const addItem = (): void => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: '', rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index: number): void => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!invoiceData.seller.trim() || !invoiceData.buyer.trim()) {
      setError('Seller and Buyer information are required');
      return false;
    }
    
    if (invoiceData.items.some(item => !item.name.trim() || !item.quantity.trim() || item.rate <= 0)) {
      setError('All items must have name, quantity, and valid rate');
      return false;
    }
    
    return true;
  };

 const generatePDF = async (): Promise<void> => {
   setError('');
   setSuccess('');

   if (!validateForm()) return;

   setLoading(true);

   try {
     console.log('Generating PDF...');
     const response: Response = await fetch('/api/pdf/generate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(invoiceData)
     });

     console.log('Response status:', response.status);

     if (!response.ok) {
       const errorText = await response.text();
       console.log('Error response:', errorText);
       throw new Error(`Server error: ${response.status}`);
     }

     // Get the PDF blob directly
     const blob = await response.blob();
     console.log('Received blob size:', blob.size, 'bytes');

     if (blob.size === 0) {
       throw new Error('Received empty PDF file');
     }

     // Create download link
     const url = window.URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = `invoice_${Date.now()}.pdf`;
     document.body.appendChild(link);
     link.click();

     // Clean up
     document.body.removeChild(link);
     window.URL.revokeObjectURL(url);

     setSuccess('🎉 PDF generated and downloaded successfully!');

   } catch (err) {
     console.error('PDF generation error:', err);
     const errorMessage: string = err instanceof Error ? err.message : 'Unknown error occurred';
     setError(`❌ Failed to generate PDF: ${errorMessage}`);
   } finally {
     setLoading(false);
   }
 };

  // Fixed download function
  const downloadPDF = async (): Promise<void> => {
    if (!downloadUrl) return;
    
    setDownloading(true);
    
    try {
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }
      
      // Get the blob from response
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice_${Date.now()}.pdf`; // Set filename
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const getTotalAmount = (): string => {
    return invoiceData.items.reduce((total, item) => total + (item.amount || 0), 0).toFixed(2);
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.headerCard}>
          <div style={styles.headerContent}>
            <FileText style={styles.headerIcon} />
            <h1 style={styles.title}>Invoice PDF Generator</h1>
          </div>
          <p style={styles.subtitle}>Create professional invoices and generate PDF documents instantly</p>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{...styles.alert, ...styles.alertError}}>
            <p style={{margin: 0, fontSize: '1.1rem', fontWeight: '600'}}>{error}</p>
          </div>
        )}
        
        {success && (
          <div style={{...styles.alert, ...styles.alertSuccess}}>
            <p style={{margin: 0, fontSize: '1.1rem', fontWeight: '600'}}>{success}</p>
            {downloadUrl && (
              <button 
                onClick={downloadPDF} 
                disabled={downloading}
                style={{
                  ...styles.downloadButton,
                  ...(downloading ? styles.downloadButtonDisabled : {})
                }}
              >
                {downloading ? (
                  <>
                    <Loader2 style={{...styles.icon, animation: 'spin 1s linear infinite'}} />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download style={styles.icon} />
                    Download PDF
                  </>
                )}
              </button>
            )}
          </div>
        )}

        <div style={styles.formGrid}>
          {/* Seller Information */}
          <div style={styles.formCard}>
            <div style={styles.sectionHeader}>
              <Building style={{...styles.sectionIcon, color: '#2563eb'}} />
              <h2 style={styles.sectionTitle}>Seller Information</h2>
            </div>
            
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Company Name *</label>
              <input
                type="text"
                value={invoiceData.seller}
                onChange={(e) => handleInputChange('seller', e.target.value)}
                style={styles.input}
                placeholder="Enter seller company name"
              />
            </div>
            
            <div style={styles.fieldGroup}>
              <label style={styles.label}>GSTIN</label>
              <input
                type="text"
                value={invoiceData.sellerGstin}
                onChange={(e) => handleInputChange('sellerGstin', e.target.value)}
                style={styles.input}
                placeholder="Enter seller GSTIN"
              />
            </div>
            
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Address</label>
              <textarea
                value={invoiceData.sellerAddress}
                onChange={(e) => handleInputChange('sellerAddress', e.target.value)}
                style={styles.textarea}
                placeholder="Enter seller address"
                rows={3}
              />
            </div>
          </div>

          {/* Buyer Information */}
          <div style={styles.formCard}>
            <div style={styles.sectionHeader}>
              <User style={{...styles.sectionIcon, color: '#059669'}} />
              <h2 style={styles.sectionTitle}>Buyer Information</h2>
            </div>
            
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Company Name *</label>
              <input
                type="text"
                value={invoiceData.buyer}
                onChange={(e) => handleInputChange('buyer', e.target.value)}
                style={styles.input}
                placeholder="Enter buyer company name"
              />
            </div>
            
            <div style={styles.fieldGroup}>
              <label style={styles.label}>GSTIN</label>
              <input
                type="text"
                value={invoiceData.buyerGstin}
                onChange={(e) => handleInputChange('buyerGstin', e.target.value)}
                style={styles.input}
                placeholder="Enter buyer GSTIN"
              />
            </div>
            
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Address</label>
              <textarea
                value={invoiceData.buyerAddress}
                onChange={(e) => handleInputChange('buyerAddress', e.target.value)}
                style={styles.textarea}
                placeholder="Enter buyer address"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div style={{...styles.formCard, ...styles.itemsCard}}>
          <div style={styles.itemsHeader}>
            <div style={styles.sectionHeader}>
              <Package style={{...styles.sectionIcon, color: '#7c3aed'}} />
              <h2 style={styles.sectionTitle}>Invoice Items</h2>
            </div>
            <button onClick={addItem} style={styles.addButton}>
              <Plus style={styles.icon} />
              Add Item
            </button>
          </div>

          <div style={{overflowX: 'auto'}}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Item Name</th>
                  <th style={styles.tableHeader}>Quantity</th>
                  <th style={styles.tableHeader}>Rate (₹)</th>
                  <th style={styles.tableHeader}>Amount (₹)</th>
                  <th style={styles.tableHeader}>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        style={styles.tableInput}
                        placeholder="Enter item name"
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        style={styles.tableInput}
                        placeholder="Qty"
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                        style={styles.tableInput}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.amountCell}>
                        ₹{item.amount.toFixed(2)}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => removeItem(index)}
                        disabled={invoiceData.items.length === 1}
                        style={{
                          ...styles.deleteButton,
                          ...(invoiceData.items.length === 1 ? {opacity: 0.5, cursor: 'not-allowed'} : {})
                        }}
                        title="Remove item"
                      >
                        <Trash2 style={styles.icon} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.totalSection}>
            <div style={styles.totalCard}>
              <p style={styles.totalText}>Total: ₹{getTotalAmount()}</p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div style={styles.generateSection}>
          <button
            onClick={generatePDF}
            disabled={loading}
            style={{
              ...styles.generateButton,
              ...(loading ? styles.generateButtonDisabled : {})
            }}
          >
            {loading ? (
              <>
                <Loader2 style={{...styles.icon, animation: 'spin 1s linear infinite'}} />
                Generating PDF...
              </>
            ) : (
              <>
                <FileText style={styles.icon} />
                Generate Invoice PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePDFGenerator;