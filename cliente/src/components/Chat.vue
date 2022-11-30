<template>
    <div class="contendorGrande">
        <h1>Subasta de : {{ this.subastaActiva.producto.nombreProducto }}</h1>
        <h2>Ultimo monto Pujado {{ this.subastaActiva.ultimaPuja }}</h2>
        <div class="contenedorChat">
            <div class="participantes">
                <h3>Participantes Activos</h3>
            </div>
            <div class="chat">
                <div v-for="(item, index) in this.subastaActiva.chat.pujas" :key="index">

                    <div class="left" v-if="(item.usuario.nombreUsuario != $store.state.usuarioLogeado.nombreUsuario)">
                        <vs-button color="#3B4254">
                            {{ item.usuario.nombreUsuario }} : {{ item.monto }}
                        </vs-button>
                    </div>

                    <div class="right" v-if="item.usuario.nombreUsuario == $store.state.usuarioLogeado.nombreUsuario">
                        <vs-button color="#5576D4">
                            {{ item.usuario.nombreUsuario }} : {{ item.monto }}
                        </vs-button>
                    </div>
                </div>
            </div>

        </div>
        <div class="enviar">

            <vs-input type="number" dark state="dark" v-model="value5"
                label-placeholder="Ingrese un monto para pujar" />
            <vs-button @click="enviarPuja" color="#39E37F">Enviar Puja</vs-button>
        </div>

        <p>Nota: El monto de ser superior que la ultima puja.</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value5: '',
            cosas: [
                {
                    nombre: "rodrigo",
                    texto: "500",
                    posicion: 1,
                },
                {
                    nombre: "rodrigo",
                    texto: "600",
                    posicion: 1,
                },
                {
                    nombre: "Juan",
                    texto: "2166",
                    posicion: 2,
                },
                {
                    nombre: "Juan",
                    texto: "23214",
                    posicion: 2,
                },
            ],
            puja: {
                usuario: null,
                monto: null,
                fecha: null,

            }
        };
    },
    props: {
        subastaActiva: {}
    },
    methods: {
        enviarPuja() {

            const puja = {
                usuario: null,
                monto: null,
                fecha: null,
            }

            puja.usuario = this.$store.state.usuarioLogeado
            puja.monto = this.value5
            puja.fecha = Date.now()

            console.log(this.puja)

            this.subastaActiva.chat.pujas.push(puja)

            console.log(this.subastaActiva.chat.pujas)

            this.actualizarSubasta()

            /* this.puja.usuario = null
            this.puja.monto = null
            this.puja.fecha = null */


        },
        actualizarSubasta() {
            this.axios.put('/subasta/'+this.subastaActiva._id,this.subastaActiva)
                .then(res => {
                    
                    console.log("Se actulizo el chat")
                })
                .catch((e) => {
                    console.log(e);

                })
        },
    },

};
</script>

<style scoped>
.contendorGrande {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
    text-align: center;
}

h1 {
    position: relative;
    text-align: center;
}

.contenedorChat {
    display: flex;
    position: relative;
    justify-content: center;
}

.chat {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: rgba(182, 182, 182, 0.214);
    width: 40%;
    height: 57vh;
    margin-bottom: 20px;
}

.right {
    float: right;
}

.participantes {
    position: relative;
    width: 30%;
    color: aliceblue;
    background-color: #222f54;
    text-align: center;

    margin-bottom: 20px;
}

.enviar {
    display: flex;
    justify-content: right;
    position: relative;
    right: 15%;

}

.enviar .vs-button {
    position: relative;
}

input {
    border: none;
    position: relative;
    margin-top: 5px;
    margin-left: 5px;
    width: 20%;
    color: aliceblue;
    background-color: #222f54;
    text-align: center;
}
</style>