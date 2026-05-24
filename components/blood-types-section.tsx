const bloodTypes = [
  { type: "A+", canDonate: "A+, AB+", canReceive: "A+, A-, O+, O-" },
  { type: "A-", canDonate: "A+, A-, AB+, AB-", canReceive: "A-, O-" },
  { type: "B+", canDonate: "B+, AB+", canReceive: "B+, B-, O+, O-" },
  { type: "B-", canDonate: "B+, B-, AB+, AB-", canReceive: "B-, O-" },
  { type: "AB+", canDonate: "AB+", canReceive: "All Types" },
  { type: "AB-", canDonate: "AB+, AB-", canReceive: "A-, B-, AB-, O-" },
  { type: "O+", canDonate: "O+, A+, B+, AB+", canReceive: "O+, O-" },
  { type: "O-", canDonate: "All Types", canReceive: "O-" },
]

export function BloodTypesSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight font-serif text-foreground md:text-4xl">
            Blood type compatibility
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Understanding which blood types are compatible can save crucial time
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bloodTypes.map((bt) => (
            <div
              key={bt.type}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
                {bt.type}
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Can donate to
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {bt.canDonate}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Can receive from
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {bt.canReceive}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
