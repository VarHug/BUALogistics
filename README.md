# bua_logistics
> 本项目为课程简单项目

## 学习记录
#### MongodDB
##### update操作符
* Array Operators
```
{ $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }
{ $push: { <field1>: <value1>, ... } }
```
#### mongoose
##### Mongoose.prototype.model()
###### Parameters

* name «String|Function» model name or class extending Model
* [schema] «Schema»
* [collection] «String» name (optional, inferred from model name)
* [skipInit] «Boolean» whether to skip initialization (defaults to false)
* When no collection argument is passed, Mongoose uses the model name. If you don't like this behavior, either pass a collection name, use mongoose.pluralize(), or set your schemas collection name option.(最好加集合名)