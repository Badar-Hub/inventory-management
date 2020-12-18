<script lang="ts">
import container from "@/IoC/config";
import { Container } from "inversify";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class OnoBase extends Vue {
  public container: Container = container;
}
</script>
