<!-- app/components/ui/ProjectSpread.vue -->
<script setup lang="ts">
import type { Project } from '~~/data/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <article
    :id="project.id"
    :class="['project-spread border-editorial', { 'project-spread--reversed': project.reversed }]"
  >
    <!-- Info panel -->
    <div class="project-info gsap-target">
      <span class="project-number text-label">{{ project.number }}</span>

      <h3 class="project-name text-project-name">
        {{ project.name }} —<br>{{ project.subtitle }}
      </h3>

      <span class="project-type text-eyebrow">{{ project.type }}</span>

      <p class="project-desc">{{ project.description }}</p>

      <ul class="project-tags" aria-label="Technologies used">
        <li v-for="tag in project.tags" :key="tag" class="text-tag">{{ tag }}</li>
      </ul>

      <div class="project-links">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link font-mono"
        >
          View Live →
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link font-mono"
        >
          GitHub →
        </a>
      </div>
    </div>

    <!-- Visual panel -->
    <div class="project-visual gsap-visual">
      <img
        :src="project.image"
        :alt="`${project.name} — ${project.subtitle} screenshot`"
        class="project-image"
        loading="lazy"
        decoding="async"
        width="800"
        height="500"
      />
    </div>
  </article>
</template>

<style scoped>
.project-spread {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
}

.project-spread--reversed {
  grid-template-columns: 1.6fr 1fr;
}

.project-spread--reversed .project-info {
  order: 2;
  border-right: none;
  border-left: 1px solid var(--border);
  padding: 48px 0 48px 48px;
}

.project-spread--reversed .project-visual {
  order: 1;
}

/* Info panel */
.project-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 48px 48px 48px 0;
  border-right: 1px solid var(--border);
}

.project-number { color: var(--text-muted); }

.project-name { color: var(--text); }

.project-type { color: var(--accent); }

.project-desc {
  font-size: 14px;
  color: #5A4A35;
  line-height: 1.7;
  flex: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
}

.project-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: auto;
}

.project-link {
  font-size: 11px;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: opacity 0.15s;
}
.project-link:hover { opacity: 0.7; }

/* Visual panel */
.project-visual {
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 300px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-visual:hover .project-image {
  transform: scale(1.03);
}

/* Mobile */
@media (max-width: 768px) {
  .project-spread,
  .project-spread--reversed {
    grid-template-columns: 1fr;
  }

  .project-info,
  .project-spread--reversed .project-info {
    order: 2;
    padding: 32px 0;
    border-right: none;
    border-left: none;
    border-top: 1px solid var(--border);
  }

  .project-visual,
  .project-spread--reversed .project-visual {
    order: 1;
    min-height: 220px;
    padding: 24px;
  }
}
</style>
