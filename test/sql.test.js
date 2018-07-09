'use strict'
const {
    sqlTranslator
} = require('jt-jsextension');

describe('getSimMaterial', () => {
    const getSimMaterial = `
    select 
    s.id DeviceId,
    SimNum DeviceNum,
    SimType DeviceType,
    'sim' Type,
    SimTypeId DeviceTypeId,
    s.NewOrOld  
    from Sim  s 
    INNER JOIN SimType st  on s.SimTypeId=st.id 
    where s.Status=1 and s.CompanyId=@companyId and s.SimStatus=0 and s.Id not in (@simArray)
    `
    const a = sqlTranslator.execute(getSimMaterial, {
        companyId: 1,
        simArray: [1, 2, 3, 4]
    });
    console.log(a);
})