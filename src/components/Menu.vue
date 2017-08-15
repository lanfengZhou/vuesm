<template>
	<div id="menu">
		<v-header></v-header>
		<div class="cotent">
			<transition name="header">
		      	<router-view></router-view>
		    </transition>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			"v-header":Header,
		},
		methods:{

		}
	}
</script>
<style scoped>
	.content{
		margin-top: 62px;
	}
</style>