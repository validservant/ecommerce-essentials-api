'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up (queryInterface, Sequelize) {
   queryInterface.addConstraint("product",{
      fields:['categoryId'],
      type:'foreign key',
      name: 'Category_product_association',
      references:{
          table:'category',
          field:"id"
      }
   })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint("product",'Category_product_association');
    },
};
