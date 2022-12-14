const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLSchema } = graphql

const Vendor = require('../mongoDB/vendorSchema')
const Product = require('../mongoDB/productSchema')

const VendorType = new GraphQLObjectType({
    name: 'Vendor',
    fields:() => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({vendorId: parent._id})
            }
        }
    })
})
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields:() => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        tag: { type: GraphQLString },
        price: { type: GraphQLString },
        rating: { type: GraphQLString },
        vendor: {
            type: VendorType,
            resolve(parent, args){
                return Vendor.findById(parent.vendorId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        vendor: {
            type: VendorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Vendor.findById(args.id)
            }
        },
        vendors: {
            type: new GraphQLList(VendorType),
            resolve(parent, args){
                return Vendor.find({})
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Product.findById(args.id)
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({})
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields : {
        addVendor: {
            type: VendorType, 
            args: {
                name: { type: GraphQLString}
            },
            resolve(parent, args){
                const vendor = new Vendor({
                    name: args.name
                })
                return vendor.save()
            }
        },
        addProduct: {
            type: ProductType, 
            args: {
                name: { type: GraphQLString},
                category: { type: GraphQLString},
                tag: { type: GraphQLString},
                price: { type: GraphQLString},
                rating: { type: GraphQLString},
                vendorId: {type: GraphQLID}
            },
            resolve(parent, args){
                const product = new Product({
                    name: args.name,
                    category: args.category,
                    tag: args.tag,
                    price: args.price,
                    rating: args.rating,
                    vendorId: args.vendorId
                })
                return product.save()
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})