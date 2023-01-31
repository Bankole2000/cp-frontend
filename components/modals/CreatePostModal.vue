<template>
  <div class="create-post-modal">
    <v-dialog
      v-model="dialog"
      content-class="rounded-xl elevated-light"
      persistent
      max-width="600px"
    >
      <v-card class="rounded-xl elevated-light">
        <v-card-title>
          <span class="headline">Create Post</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-item-group v-model="selected" mandatory>
                <v-container>
                  <v-row align="center">
                    <draggable
                      v-model="draggableCards"
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
                      <div v-for="(card, n) in draggableCards" :key="n">
                        <v-item v-slot="{ active, toggle }">
                          <v-hover v-slot="{ hover }">
                            <v-card
                              :color="active ? 'primary' : ''"
                              class="d-flex align-center rounded-lg"
                              :class="{
                                'ml-0 mr-2': n === 0,
                                'mx-2': n !== 0,
                                'elevated-light': hover || active,
                              }"
                              flat
                              dark
                              height="100"
                              style="
                                cursor: move;
                                transition: all 0.2s ease-in-out;
                              "
                              width="100"
                              @click="toggle"
                            >
                              <v-scroll-y-transition>
                                <div class="body-1 flex-grow-1 text-center">
                                  {{ card.title }}-{{ n }}
                                </div>
                              </v-scroll-y-transition>
                            </v-card>
                          </v-hover>
                        </v-item>
                      </div>
                    </draggable>
                  </v-row>
                </v-container>
              </v-item-group>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text></v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text></v-card-text>
          </v-window-item>
        </v-window>
        <!-- <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Legal first name*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal middle name"
                hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Legal last name*"
                hint="example of persistent helper text"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                :items="[
                  'Skiing',
                  'Ice hockey',
                  'Soccer',
                  'Basketball',
                  'Hockey',
                  'Reading',
                  'Writing',
                  'Coding',
                  'Basejump',
                ]"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container> -->
        <!-- <small>*indicates required field</small> -->
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'CreatePostModal',
  components: {
    draggable,
  },
  data: () => ({
    dialog: true,
    selected: 0,
    step: 1,
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
    ],
  }),
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
