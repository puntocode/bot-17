export function getSelectFormat(data:any[] = [], name:string){
  return data.map((item:any) => {
    return {name: item[name], id: item.id};
  });
}
