<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-column-table"
      title="Прайс лист"
      :rows="rows"
      :columns="columns"
    />
  </div>
</template>

<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Бренд',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'photo', label: 'Фото', field: 'photo' },
  { name: 'price', label: 'Цена', field: 'price' },
  { name: 'MOQ', label: 'Минимальный заказ', field: 'MOQ' },
]

const rows = [
  {
    name: 'Frozen Yogurt',
  },
  {
    name: 'Ice cream sandwich',
  },
  {
    name: 'Eclair',
  },
  {
    name: 'Cupcake',
  },
  {
    name: 'Gingerbread',
  },
  {
    name: 'Jelly bean',
  },
  {
    name: 'Lollipop',
  },
  {
    name: 'Honeycomb',
  },
  {
    name: 'Donut',
  },
  {
    name: 'KitKat',
  },
]

export default {
  name: 'PriceList',
  setup() {
    return {
      columns,
      rows,
    }
  },
}

// console.log(rows)
</script>

<style>
.q-pa-md {
  width: 100%;
  padding: 10px 0px;
  margin: 20px 0px;
}

.my-sticky-column-table {
}

/* specifying max-width so the example can
    highlight the sticky column on any browser window */

thead tr:first-child th:first-child {
  background-color: #fff;
}
/* bg color is important for th; just specify one */

td:first-child {
  background-color: #f5f5dc;
}

tr:first-child th:first-child {
  position: sticky;
  left: 0;
  z-index: 1;
}
</style>
