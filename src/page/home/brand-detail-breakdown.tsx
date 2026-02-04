"use client";

interface BreakdownData {
  category: string;
  items: {
    label: string;
    ratio?: string;
    low: number;
    mid: number;
    high: number;
    note?: string;
  }[];
}

interface BrandDetailBreakdownProps {
  brandName: string;
  color: string;
}

export default function BrandDetailBreakdown({
  brandName,
  color,
}: BrandDetailBreakdownProps) {
  const breakdownData: BreakdownData[] = [
    {
      category: "매출 구간",
      items: [
        { label: "매출 합계", low: 20000000, mid: 35600000, high: 80000000 },
        { label: "비용 합계", low: 18185000, mid: 30554000, high: 63315000 },
        { label: "예상 수익", low: 1815000, mid: 5046000, high: 16685000 },
        { label: "수익률", low: 9, mid: 14, high: 21 },
      ],
    },
    {
      category: "매출",
      items: [
        {
          label: "배달매출",
          low: 4000000,
          mid: 7120000,
          high: 16000000,
          note: "배달 매출 20%",
        },
        { label: "홀매출", low: 16000000, mid: 28480000, high: 64000000 },
      ],
    },
    {
      category: "변동비 (%)",
      items: [
        {
          label: "원가율",
          ratio: "36.0%",
          low: 7200000,
          mid: 12816000,
          high: 28800000,
          note: "커피 판매량에 따라 33~38% 수준",
        },
        {
          label: "카드수수료",
          ratio: "1.5%",
          low: 300000,
          mid: 534000,
          high: 1200000,
        },
        {
          label: "배달 수수료",
          ratio: "배달 매출의 30%",
          low: 1200000,
          mid: 2136000,
          high: 4800000,
          note: "배달 매출의 30% / 건당가 15,000원 기준",
        },
        {
          label: "플랫폼 수수료",
          ratio: "5.0%",
          low: 800000,
          mid: 1424000,
          high: 3200000,
          note: "KT 11번가 딜 메가오더, 프로모션 등등 추 미들의 5% 수준",
        },
        {
          label: "수도광열비",
          ratio: "2.0%",
          low: 400000,
          mid: 712000,
          high: 1600000,
        },
        {
          label: "인건비",
          ratio: "21~25%",
          low: 5000000,
          mid: 7832000,
          high: 16800000,
          note: "매출 규모별로 달라짐",
        },
      ],
    },
    {
      category: "고정비 (원)",
      items: [
        { label: "임대료", low: 3520000, mid: 2200000, high: 3850000 },
        { label: "관리비", low: 300000, mid: 220000, high: 385000 },
        {
          label: "본사 광고비",
          low: 100000,
          mid: 100000,
          high: 100000,
          note: "광고비 분담금",
        },
        {
          label: "정기 서비스",
          ratio: "(인덕션, 제빙기, 방역, 필스 등)",
          low: 300000,
          mid: 300000,
          high: 300000,
        },
        { label: "소모품비", low: 300000, mid: 300000, high: 300000 },
        { label: "로열티", low: 165000, mid: 165000, high: 165000 },
      ],
    },
  ];

  const formatMoney = (amount: number) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(0)}천만`;
    }
    if (amount >= 10000) {
      return `${(amount / 10000).toFixed(0)}만`;
    }
    return amount.toLocaleString();
  };

  const formatValue = (value: number, isPercent?: boolean) => {
    if (isPercent) {
      return `${value}%`;
    }
    return formatMoney(value);
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Title */}
      <div className="mb-6">
        <h3
          className="text-2xl font-black mb-2"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, #FFB366 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {brandName} 상세 분석
        </h3>
        <p className="text-sm text-gray-600">
          최저/평균/최고 매출 구간별 비용 분석
        </p>
      </div>

      {/* Data Tables */}
      <div className="space-y-6">
        {breakdownData.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Section Header */}
            <div
              className="px-4 py-3 font-bold text-white text-sm"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, #FFB366 100%)`,
              }}
            >
              {section.category}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">
                      항목
                    </th>
                    <th className="px-3 py-2 text-right font-semibold text-red-600">
                      최저
                    </th>
                    <th className="px-3 py-2 text-right font-semibold text-blue-600">
                      평균
                    </th>
                    <th className="px-3 py-2 text-right font-semibold text-green-600">
                      최고
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item, itemIdx) => (
                    <tr
                      key={itemIdx}
                      className={`border-b ${
                        itemIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-800">
                          {item.label}
                        </div>
                        {item.ratio && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {item.ratio}
                          </div>
                        )}
                        {item.note && (
                          <div className="text-xs text-blue-600 mt-1">
                            📝 {item.note}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-red-600">
                        {formatValue(
                          item.low,
                          item.label === "수익률"
                        )}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-blue-600">
                        {formatValue(
                          item.mid,
                          item.label === "수익률"
                        )}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-green-600">
                        {formatValue(
                          item.high,
                          item.label === "수익률"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-amber-100 rounded-xl border border-amber-300">
        <p className="text-xs text-amber-800 leading-relaxed">
          ℹ️ 위 데이터는 평균적인 수치이며, 실제 매장 위치, 운영 방식,
          시장 상황에 따라 달라질 수 있습니다.
        </p>
      </div>
    </div>
  );
}
