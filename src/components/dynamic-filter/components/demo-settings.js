export default [
  {
    type: 'menu',
    slot: 'menu',
    model: 'saleType',
    default: 'sale',
    options: [
      {
        label: 'Sale',
        value: 'sale'
      },
      {
        label: 'Resale',
        value: 'resale'
      },
      {
        label: 'Reorder',
        value: 'reorder'
      }
    ]
  },
  {
    type: 'select',
    slot: 'search',
    model: 'searchBy',
    default: 'orderId',
    clearable: false,
    hidden: true,
    tag: 'Search by: ',
    placeholder: 'Search by',
    options: [
      { label: 'Order ID', value: 'orderId' },
      { label: 'External ID', value: 'externalId' },
      { label: 'Phone', value: 'phone' },
      { label: 'Name', value: 'name' },
      { label: 'Operator', value: 'operator' },
      { label: 'Operator history', value: 'operatorHistory' },
      { label: 'Address', value: 'address' },
      { label: 'Product Name', value: 'productName' },
      { label: 'Webmaster id', value: 'webmasterId' },
      { label: 'External type', value: 'externalType' },
      { label: 'Bg task id', value: 'bgTaskId' }
    ]
  },
  { multiple: true, tag: 'Order ID: ', model: 'orderId' },
  { multiple: true, tag: 'External ID: ', model: 'externalId' },
  { multiple: true, tag: 'Phone: ', model: 'phone' },
  { multiple: true, tag: 'Name: ', model: 'name' },
  { multiple: true, tag: 'Operator: ', model: 'operator' },
  { multiple: true, tag: 'Operator history: ', model: 'operatorHistory' },
  { multiple: true, tag: 'Address: ', model: 'address' },
  { multiple: true, tag: 'Product Name: ', model: 'productName' },
  { multiple: true, tag: 'Webmaster id: ', model: 'webmasterId' },
  { multiple: true, tag: 'External type: ', model: 'externalType' },
  { multiple: true, tag: 'Bg task id: ', model: 'bgTaskId' },
  {
    type: 'text',
    slot: 'search',
    hidden: true,
    model: 'search',
    placeholder: 'Search...'
  },
  {
    type: 'select',
    slot: 'center',
    placeholder: 'All countries',
    tag: 'Country: ',
    model: 'country',
    clearable: true,
    options: [
      {
        label: 'Vietnam',
        value: 'vn'
      },
      {
        label: 'Indonesia',
        value: 'id'
      },
      {
        label: 'Malaysia',
        value: 'my'
      },
      {
        label: 'Philippines',
        value: 'ph'
      }
    ]
  },
  {
    type: 'select',
    slot: 'center',
    placeholder: 'All date',
    model: 'range',
    clearable: true,
    options: [
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Today', value: 'today' },
      { label: 'Last week', value: 'lastWeek' },
      { label: 'Last month', value: 'lastMonth' },
      { label: 'Custom', value: 'custom' }
    ]
  },
  {
    type: 'radio-group',
    slot: 'center',
    placeholder: 'Date range',
    model: 'cudate',
    default: 'created',
    linked: {
      model: 'range',
      value: 'not empty'
    },
    options: [
      { label: 'Created', value: 'created' },
      { label: 'Updated', value: 'updated' }
    ]
  },
  {
    type: 'date',
    slot: 'center',
    placeholder: 'From',
    model: 'startDate',
    tag: 'from: ',
    valueFormat: 'yyyy-MM-dd HH:ss',
    group: 2,
    linked: {
      model: 'range',
      value: 'custom'
    }
  },
  {
    type: 'date',
    slot: 'center',
    placeholder: 'To',
    model: 'endDate',
    tag: 'to: ',
    valueFormat: 'yyyy-MM-dd HH:ss',
    group: 2,
    linked: {
      model: 'range',
      value: 'custom'
    }
  },
  {
    type: 'select',
    slot: 'center',
    placeholder: 'All statuses',
    model: 'status',
    multiple: true,
    tag: 'Status: ',
    clearable: true,
    options: [
      { label: 'New', value: '1' },
      { label: 'Dublicated', value: '7' },
      { label: 'Approved', value: '2' },
      { label: 'Approve waiting', value: '8' },
      { label: 'Recall', value: '4' },
      { label: 'Uncall', value: '5' },
      { label: 'Trash', value: '6' },
      { label: 'Reject', value: '3' }
    ]
  }
]
