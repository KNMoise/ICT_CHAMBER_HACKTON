import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Component {
  name: string
  description: string
}

interface LayerDetailsProps {
  title: string
  description: string
  components: Component[]
  technologies: Component[]
}

export default function LayerDetails({ title, description, components, technologies }: LayerDetailsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Components</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {components.map((component, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{component.name}</TableCell>
                    <TableCell>{component.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">Technologies</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {technologies.map((technology, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{technology.name}</TableCell>
                    <TableCell>{technology.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
