<template>
    <div class="hidden">
        <h1>Subasta de : "nombre producto"</h1>
        <h2>Ultimo monto Pujado</h2>
        <div class="contenedorChat">
            <div class="participantes">
                <h3>Participantes Activos</h3>
            </div>
            <div class="chat">
                <div v-for="(item, index) in cosas" :key="index">
                    <div class="left" v-if="item.posicion == 2">
                        <vs-button color="#3B4254">
                            {{ item.nombre }} : {{ item.texto }}
                        </vs-button>
                    </div>
                    <div class="right" v-if="item.posicion == 1">
                        <vs-button color="#5576D4">
                            {{ item.nombre }} : {{ item.texto }}
                        </vs-button>
                    </div>
                </div>
            </div>

        </div>
        <div class="enviar">

            <vs-input type="number" dark state="dark" v-model="value5"
                label-placeholder="Ingrese un monto para pujar" />
            <vs-button color="#39E37F">Enviar Puja</vs-button>
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
        };
    },
};
</script>

<style scoped>
.hidden {
    display: flex;
    justify-content: space-around;
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