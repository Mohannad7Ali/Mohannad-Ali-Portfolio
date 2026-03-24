"use client";

import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import { getSkills } from "@/lib/config";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function AboutSection() {
  const skills = getSkills();
  const frontendSkills = skills.filter(
    (skill) => skill.category === "frontend",
  );
  const backendSkills = skills.filter((skill) => skill.category === "backend");
  const otherSkills = skills.filter(
    (skill) => skill.category !== "frontend" && skill.category !== "backend",
  );

  return (
    <SectionContainer id="about">
      <SectionHeading
        title="About Me"
        subtitle="I'm a passionate web developer with a focus on creating beautiful, functional, and user-friendly experiences."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Background */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-semibold mb-4">My Background</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I am a <strong>Software Engineer</strong> driven by the
                challenge of scaling digital products and building resilient
                infrastructure. With deep expertise in the{" "}
                <strong>JavaScript/TypeScript ecosystem</strong> (Node.js &
                Next.js), I design systems that aren't just functional, but are
                built to last through <strong>Clean Architecture</strong> and
                rigorous engineering standards.
              </p>

              <p>
                My approach centers on transforming complex business
                requirements into performant, production-ready reality. Whether
                it's architecting scalable backend services or crafting seamless
                frontend experiences, I prioritize{" "}
                <strong>
                  maintainability, security, and system performance
                </strong>{" "}
                at every stage of the development lifecycle.
              </p>

              <p>
                Beyond writing code, I am committed to continuous learning and
                professional growth. I focus on mastering architectural patterns
                like <strong>DDD and Dependency Injection</strong>, ensuring
                that the solutions I deliver are robust enough to meet the
                demands of modern, high-traffic web platforms.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <div className="space-y-8">
          {/* Frontend Skills */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-4">Frontend Skills</h3>
              <div className="space-y-4">
                {frontendSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Backend Skills */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-4">Backend Skills</h3>
              <div className="space-y-4">
                {backendSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Other Skills */}
          {otherSkills.length > 0 && (
            <div className="overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-xl font-semibold mb-4">Other Skills</h3>
                <div className="space-y-4">
                  {otherSkills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}

interface SkillBarProps {
  skill: {
    name: string;
    level: number;
  };
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1, delay: 0.1 * index }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Progress value={skill.level} className="h-2 w-full" />
      </motion.div>
    </div>
  );
}
