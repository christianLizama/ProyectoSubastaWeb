<template>
    <div class="caja">
        <h2>Reportes de las subastas</h2>

        <div class="table">
            
            <td class="elem"><b>Producto Rematado</b> </td>
            <td class="elem"><b>Monto Recaudado</b></td>
            <td class="elem"><b>Comprador</b></td>
        </div>
       <!--  let ultimo = frutas[frutas.length - 1] -->
        <!-- <tr class="table" v-for="(item, index) in this.subastas"  :key="index">
            <td class="elem">{{item.producto.nombreProducto}}</td>
            <td class="elem">{{item.ultimaPuja}}</td>
            <td class="elem">{{item.ultimaPuja}}</td>
        </tr> -->

        <tr class="table" v-for="(item, index) in this.usuarios"  :key="index">
            <td class="elem">{{item.producto.nombreProducto}}</td>
            <td class="elem">$ {{item.ultimaPuja.monto}}</td>
            <td class="elem">{{item.ultimaPuja.usuario.nombreUsuario}}</td>
        </tr>

        <div class="table" >
            <td class="elem" style="border: 1px solid black;"><b>Total Monto Recaudado</b></td>
            
            <td class="elem" style="border: 1px solid black;"><b>$ {{this.total}}</b></td>
           
            <td class="elem"><b></b></td>
        </div>






    </div>
</template>

<script>
export default {

    data() {
        return {
            subastas: {},
            usuarios:[],
            total:0
        };
    },

    created() {
        this.listarsubastas()
    },

    methods: {
        listarsubastas() {
            this.axios.get('/subasta')
                .then((res) => {
                    this.subastas = res.data
                    this.subastas.forEach(element => {

                        if(element.estado==false){
                            this.usuarios.push(element)
                            this.total = this.total + parseInt(element.ultimaPuja.monto)
                        }
                    });
                })
                .catch((e) => {
                    console.log(e.response);
                })
        },
    },
};
</script>

<style scoped>
.caja {
    position: relative;
    width: 100%;
    left: 50px;
}

h2 {
    text-align: center;
}

.table {
    display: flex;
    justify-content: center;
    width: 100%;

}

.elem {
    width: 30%;
    text-align: center;
}
</style>