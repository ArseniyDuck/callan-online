export function getColumns<Type> (columnsCount: number, data: Array<Type>, mode: 'columns' | 'left-right' = 'columns' ) {
   const template: Array<Array<Type>> = [];

   for (let i = 0; i < columnsCount; i++) {
      template.push([]);
   }

   data.forEach((elem, index) => {
      const column = mode === 'left-right' && columnsCount !== 1 ? Math.ceil(data.length / 2) > index ? 0 : 1 : Math.ceil(index % columnsCount);
      template[column].push(elem);
   });

   return template;
};


export function addZero(n: number) {
   return n / 10 <= 1 ? `0${n}` : `${n}`;
}