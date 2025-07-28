import React, { useContext } from "react";
import { AlertTriangle, BatteryCharging, Zap, Disc, Lock, Wrench } from "lucide-react";
import { useTranslation } from "../contexts/TranslationContext";

const issues = [
  {
    icon: <AlertTriangle color="#f47b20" size={32} />, // narancssárga
    titleKey: "common_issue_1_title",
    descKey: "common_issue_1_desc",
  },
  {
    icon: <BatteryCharging color="#f47b20" size={32} />,
    titleKey: "common_issue_2_title",
    descKey: "common_issue_2_desc",
  },
  {
    icon: <Lock color="#f47b20" size={32} />,
    titleKey: "common_issue_3_title",
    descKey: "common_issue_3_desc",
  },
  {
    icon: <Disc color="#f47b20" size={32} />,
    titleKey: "common_issue_4_title",
    descKey: "common_issue_4_desc",
  },
  {
    icon: <Zap color="#f47b20" size={32} />,
    titleKey: "common_issue_5_title",
    descKey: "common_issue_5_desc",
  },
  {
    icon: <Wrench color="#f47b20" size={32} />,
    titleKey: "common_issue_6_title",
    descKey: "common_issue_6_desc",
  },
];

const CommonIssues: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="common-issues-section" id="common-issues" style={{ background: '#181818', color: '#fff', padding: '2.5rem 0', margin: '0', borderRadius: '0.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '100vw' }}>
      <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 700 }}>{t("common_issues_title")}</h2>
        <div className="issues-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {issues.map((item, idx) => (
            <div key={idx} className="issue-card" style={{ background: '#23262e', borderRadius: '0.7rem', padding: '1.2rem 1.3rem', flex: '1 1 260px', minWidth: 220, maxWidth: 300, boxShadow: '0 2px 12px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s', cursor: 'default' }}>
              <div style={{ marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>{t(item.titleKey)}</div>
              <div style={{ fontSize: '1rem', color: '#e0e0e0' }}>{t(item.descKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonIssues;
