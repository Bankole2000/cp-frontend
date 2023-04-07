<template>
  <div>
    <v-card-text style="overflow-x: scroll">
      <v-item-group v-model="selected" mandatory>
        <v-container>
          <v-row align="center">
            <draggable
              v-model="postMedia"
              :move="draggableMoved"
              tag="v-layout"
              @change="draggableChanged"
              @start="dragStart"
              @add="dragAdd"
              @remove="dragRemove"
              @update="dragUpdate"
              @end="dragEnd"
              @choose="dragChoose"
              @unchoose="dragUnchoose"
              @sort="dragSort"
              @filter="dragFilter"
              @clone="dragClone"
            >
              <div v-for="(m, n) in postMedia" :key="m.id">
                <v-item v-slot="{ active, toggle }">
                  <v-hover v-slot="{ hover }">
                    <v-card
                      :outlined="active"
                      class="d-flex align-center rounded-lg"
                      :class="{
                        'ml-0 mr-1': n === 0,
                        'mx-1': n !== 0,
                        'elevated-light': hover || active,
                      }"
                      flat
                      dark
                      height="50"
                      style="cursor: move; transition: all 0.2s ease-in-out"
                      width="60"
                      @click="toggle"
                    >
                      <v-img
                        :src="
                          m.type === 'IMAGE'
                            ? `${m.imageUrl}?thumb=60x50`
                            : m.imageUrl
                        "
                        :aspect-ratio="60 / 60"
                      >
                        <template #placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              size="24"
                              color="primary lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                      <!-- <v-scroll-y-transition>
                        <div class="body-1 flex-grow-1 text-center">
                          {{ card.title }}-{{ n }}
                        </div>
                      </v-scroll-y-transition> -->
                    </v-card>
                  </v-hover>
                </v-item>
              </div>
            </draggable>
          </v-row>
        </v-container>
      </v-item-group>
    </v-card-text>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  props: ['media'],
  data() {
    return {
      selected: 0,
      // media: [
      //   {
      //     id: '85g3ajqyq6vgbnu',
      //     type: 'IMAGE',
      //     imageUrl:
      //       'http://localhost:8080/api/files/08tzclgz3oh38j1/85g3ajqyq6vgbnu/post_image_CDZcEMZ17w.png',
      //     image: 'post_image_CDZcEMZ17w.png',
      //     order: 0,
      //     data: {},
      //     post: '1ytfjmtmycgl9ob',
      //     created: '2023-03-14T06:37:16.075Z',
      //     updated: '2023-03-14T06:37:16.075Z',
      //   },
      //   {
      //     id: 'jzcwa2smlvjcx73',
      //     type: 'IMAGE',
      //     imageUrl:
      //       'http://localhost:8080/api/files/08tzclgz3oh38j1/jzcwa2smlvjcx73/post_image_KGnS3EOWdS.png',
      //     image: 'post_image_KGnS3EOWdS.png',
      //     order: 1,
      //     data: {},
      //     post: '1ytfjmtmycgl9ob',
      //     created: '2023-03-14T06:37:45.718Z',
      //     updated: '2023-03-14T06:37:45.718Z',
      //   },
      //   {
      //     id: 'rb7864034iv1ulw',
      //     type: 'IMAGE',
      //     imageUrl:
      //       'http://localhost:8080/api/files/08tzclgz3oh38j1/rb7864034iv1ulw/post_image_1R5xi3FSb1.png',
      //     image: 'post_image_1R5xi3FSb1.png',
      //     order: 2,
      //     data: {},
      //     post: '1ytfjmtmycgl9ob',
      //     created: '2023-03-14T06:39:19.987Z',
      //     updated: '2023-03-14T06:39:19.987Z',
      //   },
      // ],
      draggableCards: [
        {
          title: 'One',
        },
        {
          title: 'Two',
        },
        {
          title: 'Three',
        },
        {
          title: 'Four',
        },
        {
          title: 'Five',
        },
        {
          title: 'Six',
        },
      ],
    }
  },
  computed: {
    postMedia: {
      get() {
        return this.media
      },
      set(val) {
        console.log({ val })
        this.$emit('dragged', val)
      },
    },
  },
  methods: {
    draggableChanged(e) {
      console.log('draggableChanged event')
      console.log({ e, selected: this.selected })
      const {
        moved: { newIndex, oldIndex },
      } = e
      if (newIndex > -1) {
        if (oldIndex === this.selected) {
          this.selected = newIndex
        } else {
          if (oldIndex > this.selected && newIndex <= this.selected) {
            this.selected += 1
            return
          }
          if (oldIndex < this.selected && newIndex >= this.selected) {
            this.selected -= 1
          }
        }
      }
    },
    draggableMoved(e, originalEvent) {
      console.log('draggableMoved event')
      const { draggedContext } = e
      console.log({ draggedContext, e, originalEvent })
      // NOTE: return false to cancel the move operation
      // return false
    },
    dragStart(e) {
      console.log('Drag Start')
      console.log({ e, selected: this.selected })
    },
    dragAdd(e) {
      console.log('Drag Add')
      console.log({ e, selected: this.selected })
    },
    dragRemove(e) {
      console.log('Drag Remove')
      console.log({ e, selected: this.selected })
    },
    dragUpdate(e) {
      console.log('Drag Update')
      console.log({ e, selected: this.selected })
    },
    dragEnd(e) {
      console.log('Drag End')
      console.log({ e, selected: this.selected })
    },
    dragChoose(e) {
      console.log('Drag Choose')
      console.log({ e, selected: this.selected })
    },
    dragUnchoose(e) {
      console.log('Drag Unchoose')
      console.log({ e, selected: this.selected })
    },
    dragSort(e) {
      console.log('Drag Sort')
      console.log({ e, selected: this.selected })
    },
    dragFilter(e) {
      console.log('Drag Filter')
      console.log({ e, selected: this.selected })
    },
    dragClone(e) {
      console.log('Drag Clone')
      console.log({ e, selected: this.selected })
    },
  },
}
</script>

<style></style>
