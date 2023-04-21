export default {
  name: 'restaurent',
  title: 'Restaurent',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Restaurent name',
      type: 'string',
      Validation:(Rule)=>Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      Validation:(Rule)=>Rule.max(200),
    },
    {
      name: 'image',
      title: 'Restaurent\'s Image',
      type: 'image',
    },
    {
      name: 'lat',
      title: 'Latitude of the restaurent',
      type: 'number',
    },
    {
      name: 'long',
      title: 'Longitude of the restaurent',
      type: 'number',
    },
    {
      name: 'address',
      title: 'Reaturent Address',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Enter a Rating from (1-5) stars',
      type: 'number',
      Validation:(Rule)=>Rule.required()
       .min(1)
       .max(5)
       .error('Please enter value from 1 to5 '),
    },
    {
      name: 'type',
      title: 'Category',
      Validation:(Rule)=>Rule.required(),
      type: 'reference',
      to:[{type:'category'}]
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of:[{type:'reference',to:[{type:'dish'}] }]
    },
    
  ],


}
