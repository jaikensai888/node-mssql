# jt-mssql

## Description

This extension based on node-mssql

see [tedious node-mssql](https://github.com/tiandaox/egg-mssql) for more detail.

## version

1.0.4

## usage

```npm
npm install jtapp -save
```

## Example

---

### **Request**

#### **asyncQuery(command,params)**

Call query Command by Async ( 异步  方法调用 query)

**Arguments**

- command (String) - T-SQL command to be executed.（执行的 sql 语句）
- params (Array/Object) - T-SQL params values （sql 语句中的参数值对象）

**Params Only Support Below Formatter(params 只支持下面的数据格式)**

```js
params1 = { id: 1, name: "jack" };
params2 = [1, 2, 3, 4];
params3={id：1，schoolId:[1,2,3,4]};
```

** Example**

```js
it("asyncQuery Test", async () => {
  const pool = await app.mssql.get("db1");
  const result = await pool
    .request()
    .asyncQuery("select TemplateId from myTable2 where id=@id", {
      id: 1
    });
  assert(result.recordset[0].TemplateId == 1);
});
```

---

### **asyncInsert([command?:String],[params?:Array])**

Call Insert Command by Async ( 异步方法调用 Insert)

**Arguments**

- command - T-SQL command to be executed.（执行的 sql 语句）
- params - T-SQL params values （sql 语句中的参数值对象）

** Params Only Support Below Formatter (params 只支持下面的数据格式)**

```js
params1 = [{ id: 1, name: "jack" }, { id: 2, name: "mike" }];
```

**Example**

```js
  it("asyncInsert Test", async () => {
    const pool = await app.mssql.get('db1');
    const result = await pool.request().asyncInsert(`insert into myTable2 (TemplateId) values(@TemplateId) ; select SCOPE_IDENTITY() as id`, [{
      Templateid: 1
    }]);
    assert(result.recordset[0].id !== undefined);
  });
});
```

---

### **Transaction**

#### **asyncBegin([isolationLevel?:obj], [callback?:async Func])**

Async begin Transaction (异步 方法调用 query)

**Arguments**

- isolationLevel - Controls the locking and row versioning behavior of TSQL statements issued by a connection. Optional. `READ_COMMITTED` by default. For possible values see `sql.ISOLATION_LEVEL`.[查看 node-mssql](https://github.com/tiandaox/egg-mssql)
- callback(err) - An Async callback which is called after transaction has began;(异步回调方法)

**Example**

```js
it("asyn transaction test", async () => {
  const pool = await app.mssql.get("db1");
  const transaction = pool.transaction();
  await transaction.asyncBegin(async err => {
    try {
      const result = await transaction
        .request()
        .asyncQuery(
          `insert into myTable2 (TemplateId) values(@TemplateId) ; select SCOPE_IDENTITY() as id`,
          {
            Templateid: 1
          }
        );
      console.log(result.recordset[0].id);
      assert(result.recordset[0].id !== undefined);
      const result2 = await transaction
        .request()
        .asyncQuery(
          `insert into myTable (TemplateName) values(@TemplateName) ; select SCOPE_IDENTITY() as id`,
          {
            TemplateName: "abc"
          }
        );
      assert(result2.recordset[0].id !== undefined);
      transaction.commit();
    } catch (error) {
      console.log(error);
      transaction.rollback();
    }
  });
});
```

---
